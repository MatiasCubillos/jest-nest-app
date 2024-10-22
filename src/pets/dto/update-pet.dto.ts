import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePetDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  breed: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsDate()
  @IsOptional()
  lastRevision?: Date;

  @IsBoolean()
  @IsOptional()
  allVaccines: boolean;
}
