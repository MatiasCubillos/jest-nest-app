import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';

describe('PetsController', () => {
  let controller: PetsController;
  let service: PetsService;
  let repository: Repository<Pet>;

  beforeEach(() => {
    service = new PetsService(repository);
    controller = new PetsController(service);
  });
});
