import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/createCourseDto';
import { UpdateCourseDto } from './dto/updateCourseDto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async findAll() {
    const courses = await this.coursesRepository.find();
    if (courses.length < 1) {
      throw new HttpException('Lista vazia.', HttpStatus.NOT_FOUND);
    }
    return courses;
  }

  async findById(id: string) {
    const course = await this.coursesRepository.findOne(id);
    if (!course) {
      throw new HttpException(
        `Curso com o id ${id}, não foi encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const isExistName = await this.coursesRepository.findOne({
      name: createCourseDto.name,
    });

    if (isExistName) {
      throw new HttpException(
        `Curso com o nome ${isExistName.name} já foi cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.preload({
      id: +id,
      ...updateCourseDto,
    });

    if (!course) {
      throw new HttpException(
        `Curso com o id ${id} não foi encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isExistName = await this.coursesRepository.findOne({
      name: updateCourseDto.name,
    });

    if (isExistName && course.id !== isExistName.id) {
      throw new HttpException(
        `Curso com o nome ${isExistName.name} já foi cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.coursesRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.coursesRepository.findOne(id);
    if (!course) {
      throw new HttpException(
        `Curso com o id ${id} não foi encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (course.isActive) {
      throw new HttpException(
        `Curso ativo não pode ser excluído.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.coursesRepository.remove(course);
  }
}
