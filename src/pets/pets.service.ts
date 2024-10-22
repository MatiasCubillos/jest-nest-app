import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  create(createPetDto: CreatePetDto) {
    return this.petRepository.save(createPetDto);
  }

  findAll() {
    return this.petRepository.find();
  }

  findOne(id: number) {
    return this.petRepository.findOneBy({ id });
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return this.petRepository.update(id, updatePetDto);
  }

  remove(id: number) {
    return this.petRepository.softDelete({ id });
  }
}
