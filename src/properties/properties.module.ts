import { Module } from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { PropertiesController } from './properties.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Property } from './entities/property.entity'
import { Car } from '../cars/entities/car.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Property, Car])],
    controllers: [PropertiesController],
    providers: [PropertiesService]
})
export class PropertiesModule {}
