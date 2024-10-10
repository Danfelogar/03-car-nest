import { IsString } from 'class-validator';

//cuando haga un post a la ruta /cars, se recibirá un objeto con las propiedades brand y model o se espera sino no se deja usar el servicio
export class CreateCarDto {
  //Decorador de class-validator que valida que el valor sea un string
  @IsString({ message: 'Brand must be a string' })
  readonly brand: string;

  @IsString()
  // @MinLength(3, { message: 'Model is too short' })
  readonly model: string;
}
