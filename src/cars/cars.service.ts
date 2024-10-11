import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'BMW',
    //   model: 'Serie 3',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Audi',
    //   model: 'A3',
    // },
  ];
  //por defecto el método es public por lo que en este caso no es necesario
  public findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const carById = this.cars.find((car) => car.id === id);

    if (!carById) throw new NotFoundException(`Car with id ${id} not found`);

    return carById;
  }

  create(createCarDTO: CreateCarDto) {
    const newCar = {
      id: uuid(),
      ...createCarDTO,
    };

    this.cars.push(newCar);

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new NotFoundException(`Car  id ${id} it's not valid inside body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          //ser cocientes que aquí se pude modificar un uuid, lo cual no es recomendable
          ...updateCarDto,
          //por seguridad se regresa el id de la base de datos aquí por si algo malo pasara
          id,
        };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const carDB = this.findOneById(id);

    if (!carDB)
      throw new NotFoundException(
        `Car with id ${id} not found, try again with another id`,
      );

    this.cars = this.cars.filter((car) => car.id !== id);

    return `success, car with id ${id} was deleted`;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
