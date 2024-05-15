import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './entities/order.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CarsService } from '../cars/cars.service'
import { Car } from '../cars/entities/car.entity'

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(Car)
        private carRepository: Repository<Car>,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        private usersService: UsersService,
        private carsService: CarsService
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const user = await this.usersRepository.findOne({
            where: { id: createOrderDto.userId }
        })

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        const car = await this.carsService.findOne(createOrderDto.carId)

        if (!car) {
            throw new HttpException('Машина не найдена', HttpStatus.NOT_FOUND)
        }

        if (car.numberOfAvailable > 0) {
            car.numberOfAvailable = car.numberOfAvailable - 1

            await this.carRepository.save(car)
        } else {
            throw new HttpException('Машина недоступна', HttpStatus.BAD_REQUEST)
        }

        const order = this.orderRepository.create({
            ...createOrderDto,
            bookingTime: Math.round(Date.now() / 1000),
            user,
            car
        })

        setTimeout(() => {
            this.carsService.update(car.id, {
                numberOfAvailable: car.numberOfAvailable + 1
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
