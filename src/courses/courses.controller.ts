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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourse: { name: string; duration: number },
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Curso atualizado com sucesso!', course: updateCourse });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json({ message: `Curso com o id ${id}, apagado com sucesso!` });
  }
}
