import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './entities/order.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CarsService } from '../cars/cars.service'

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        private usersService: UsersService,
        private carsService: CarsService
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const user = await this.usersService.findOne({ id: createOrderDto.userId })

        if (!user) {
            throw new Error('Пользователь не найден')
        }

        const car = await this.carsService.findOne(createOrderDto.carId)

        if (!car) {
            throw new Error('Машина не найдена')
        }

        const order = this.orderRepository.create({
            ...createOrderDto,
            bookingTime: Math.round(Date.now() / 1000),
            user,
            car
        })

        setTimeout(() => {
            this.carsService.update(car.id, {
                numberOfAvailable: car.numberOfAvailable - 1
            })
        }, createOrderDto.bookingDuration * 1000)

        return this.orderRepository.save(order)
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['user', 'car'] })
    }

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'car']
        })
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.orderRepository.preload({
            id: id,
            ...updateOrderDto
        })
        if (!order) {
            throw new Error(`Order #${id} not found`)
        }
        return this.orderRepository.save(order)
    }

    async remove(id: number): Promise<void> {
        await this.orderRepository.delete(id)
    }
}
