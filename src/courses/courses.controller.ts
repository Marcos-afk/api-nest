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
  async findAll(@Res() res: Response) {
    const courses = await this.coursesService.findAll();
    return res.status(HttpStatus.OK).json(courses);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const course = await this.coursesService.findById(id);
    return res.status(HttpStatus.OK).json(course);
  }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto, @Res() res: Response) {
    const course = await this.coursesService.create(createCourseDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Curso criado com sucesso!', createCourse: course });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Res() res: Response,
  ) {
    const course = await this.coursesService.update(id, updateCourseDto);
    return res.status(HttpStatus.OK).json({
      message: 'Curso atualizado com sucesso!',
      updateCourse: course,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const course = await this.coursesService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: `Curso com o id ${id}, apagado com sucesso!`,
      deletedCourse: course,
    });
  }
}
