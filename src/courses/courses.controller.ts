import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get()
  findAll(@Res() res: Response) {
    const courses = this.coursesService.findAll();
    return res.status(HttpStatus.OK).json(courses);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Res() res: Response) {
    const course = this.coursesService.findById(id);
    return res.status(HttpStatus.OK).json(course);
  }

  @Post()
  create(@Body() createCourse: Course, @Res() res: Response) {
    this.coursesService.create(createCourse);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Curso criado com sucesso!' });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourse: Course,
    @Res() res: Response,
  ) {
    this.coursesService.update(id, updateCourse);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Curso atualizado com sucesso!' });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.coursesService.remove(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: `Curso com o id ${id}, apagado com sucesso!` });
  }
}
