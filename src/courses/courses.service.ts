import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/createCourseDto';
import { UpdateCourseDto } from './dto/updateCourseDto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/Tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async findAll() {
    const courses = await this.coursesRepository
      .createQueryBuilder('courses')
      .leftJoin('courses.tags', 'tags')
      .addSelect(['tags.name'])
      .getMany();
    if (courses.length < 1) {
      throw new HttpException('Lista vazia.', HttpStatus.NOT_FOUND);
    }
    return courses;
  }

  public async findById(id: string) {
    const course = await this.coursesRepository
      .createQueryBuilder('courses')
      .leftJoin('courses.tags', 'tags')
      .addSelect(['tags.name'])
      .where('courses.id = :id', { id })
      .getOne();
    if (!course) {
      throw new HttpException(
        `Curso com o id ${id}, não foi encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }

  public async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );

    const isExistName = await this.coursesRepository.findOne({
      name: createCourseDto.name,
    });

    if (isExistName) {
      throw new HttpException(
        `Curso com o nome ${isExistName.name} já foi cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const course = this.coursesRepository.create({
      ...createCourseDto,
      tags,
    });
    return this.coursesRepository.save(course);
  }

  public async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags = await Promise.all(
      updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );

    const course = await this.coursesRepository.preload({
      id: +id,
      ...updateCourseDto,
      tags,
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

  public async remove(id: string) {
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

  private async preloadTagByName(name: string) {
    const tag = await this.tagsRepository.findOne({ name });
    if (!tag) {
      return this.tagsRepository.create({ name });
    }

    return tag;
  }
}
