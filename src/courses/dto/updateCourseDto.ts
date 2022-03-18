import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString({ each: true })
  @ArrayNotEmpty()
  readonly tags: string[];
  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;
}
