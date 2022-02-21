import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ message: 'Lista de cursos!' });
  }

  @Get(':id')
  findById(@Param('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json({ message: `Curso do id ${id} encontrado!` });
  }

  @Post()
  create(
    @Body() createCourse: { name: string; duration: number },
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Curso criado com sucesso!', course: createCourse });
  }
}
