import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
//se coloca a nivel de decorador/controller para que se aplique a todos los métodos del controlador, pero se colocara a un nivel mas grande en el main.ts a nivel de app
// @UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  //no es necesario tipar el id, pero se puede hacer ya que siempre se recibirá un string
  // getCarById(@Param('id') id: string) {
  //Pipe es usado para validar el tipo de dato que se recibe en este caso Int para que sea un número o entero mas bien
  // getCarById(@Param('id', ParseIntPipe) id: number) {
  getCarById(@Param('id', ParseUUIDPipe) id) {
    // console.log({ id });
    //recuerda que el id es un string, por lo que se debe convertir a number con el "+"
    // return this.carsService.findOneById(+id);

    return this.carsService.findOneById(id);
  }
  //DTO(Data Transfer Object) es una clase que se usa para tipar los datos que se reciben en el body
  @Post()
  // @UsePipes(ValidationPipe)
  createCar(@Body() createCarDTO: CreateCarDto) {
    return this.carsService.create(createCarDTO);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
