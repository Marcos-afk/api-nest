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
import { CreateCourseDto } from './dto/createCourseDto';
import { UpdateCourseDto } from './dto/updateCourseDto';

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
  create(@Body() createCourseDto: CreateCourseDto, @Res() res: Response) {
    const course = this.coursesService.create(createCourseDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Curso criado com sucesso!', createCourse: course });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Res() res: Response,
  ) {
    const course = this.coursesService.update(id, updateCourseDto);
    return res.status(HttpStatus.OK).json({
      message: 'Curso atualizado com sucesso!',
      updateCourse: course,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const course = this.coursesService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: `Curso com o id ${id}, apagado com sucesso!`,
      UpdateCourse: course,
    });
  }
}
