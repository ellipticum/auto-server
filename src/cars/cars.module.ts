import { Module } from '@nestjs/common'
import { CarsService } from './cars.service'
import { CarsController } from './cars.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Car } from './entities/car.entity'
import { Property } from '../properties/entities/property.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Car, Property])],
    controllers: [CarsController],
    providers: [CarsService]
})
export class CarsModule {}
