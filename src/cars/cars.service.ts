import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Car } from './entities/car.entity'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private carsRepository: Repository<Car>
    ) {}

    async create(createCarDto: CreateCarDto): Promise<Car> {
        const car = this.carsRepository.create(createCarDto)
        return this.carsRepository.save(car)
    }

    async findAll(): Promise<Car[]> {
        return this.carsRepository.find()
    }

    async findOne(id: number): Promise<Car> {
        return this.carsRepository.findOne({ where: { id } })
    }

    async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
        const car = await this.carsRepository.preload({
            id: id,
            ...updateCarDto
        })
        if (!car) {
            throw new Error(`Car #${id} not found`)
        }
        return this.carsRepository.save(car)
    }

    async remove(id: number): Promise<void> {
        await this.carsRepository.delete(id)
    }
}
