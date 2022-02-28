import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
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
}
