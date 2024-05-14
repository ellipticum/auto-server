// cars.module.ts
import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Car } from './entities/car.entity'
import { CarsService } from './cars.service'
import { CarsController } from './cars.controller'
import { PropertiesModule } from '../properties/properties.module'
import { Property } from '../properties/entities/property.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Car, Property]), forwardRef(() => PropertiesModule)],
    controllers: [CarsController],
    providers: [CarsService],
    exports: [CarsService]
})
export class CarsModule {}
