import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Order } from './entities/order.entity'
import { UsersService } from '../users/users.service'
import { CarsService } from '../cars/cars.service'
import { Car } from '../cars/entities/car.entity'
import { PropertiesService } from '../properties/properties.service'
import { Property } from '../properties/entities/property.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Order, User, Car, Property])],
    controllers: [OrdersController],
    providers: [OrdersService, UsersService, CarsService, PropertiesService]
})
export class OrdersModule {}
