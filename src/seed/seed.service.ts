import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRAND_SEED } from './data/brands.seed';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly CarsService: CarsService,
    private readonly BrandsService: BrandsService,
  ) {}

  populateDB() {
    // CARS_SEED
    // BRAND_SEED
    this.CarsService.fillCarsWithSeedData(CARS_SEED);
    this.BrandsService.fillBrandsWithSeedData(BRAND_SEED);

    return 'SEED executed';
  }
}
