import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './createCourseDto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
