import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Redes de computadores',
      duration: 50,
      description: 'Curso básico de redes',
      tags: ['redes de computadores', 'iniciante'],
    },
  ];

  findAll() {
    if (this.courses.length < 1) {
      throw new HttpException('Lista vazia.', HttpStatus.NOT_FOUND);
    }
    return this.courses;
  }

  findById(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));
    if (!course) {
      throw new HttpException(
        `Curso com o id ${id}, não foi encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }

  create(createCourseDto: any) {
    const isExistName = this.courses.find(
      (course) => course.name === createCourseDto.name,
    );

    if (isExistName) {
      throw new HttpException(
        `Curso com o nome ${isExistName.name} já foi cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExistId = this.courses.find(
      (course) => course.id === Number(createCourseDto.id),
    );

    if (isExistId) {
      throw new HttpException(
        `Curso com o id ${isExistId.id} já foi cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  update(id: string, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    if (indexCourse < 0) {
      throw new HttpException(
        `Curso com o id ${id} não foi encontrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExistName = this.courses.find(
      (course) => course.name === updateCourseDto.name,
    );

    if (isExistName && this.courses[indexCourse].id !== isExistName.id) {
      throw new HttpException(
        `Curso com o nome ${isExistName.name} já foi cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExistId = this.courses.find(
      (course) => course.id === Number(updateCourseDto.id),
    );

    if (isExistId && this.courses[indexCourse].id !== isExistId.id) {
      throw new HttpException(
        `Curso com o id ${isExistId.id} já foi cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.courses[indexCourse] = updateCourseDto;
    return updateCourseDto;
  }

  remove(id: string) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    if (indexCourse < 0) {
      throw new HttpException(
        `Curso com o id ${id} não foi encontrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.courses.splice(indexCourse, 1);
  }
}
