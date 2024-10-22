import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsNumber()
  age: number;

  @IsDate()
  @IsOptional()
  lastRevision?: Date;

  @IsBoolean()
  allVaccines: boolean;
}
