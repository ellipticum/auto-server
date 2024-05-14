import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Car } from './entities/car.entity'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'
import { PropertiesService } from '../properties/properties.service'
import { Property } from '../properties/entities/property.entity'

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private carsRepository: Repository<Car>,
        @Inject(forwardRef(() => PropertiesService))
        private propertiesService: PropertiesService
    ) {}

    async create(createCarDto: CreateCarDto): Promise<Car> {
        const car = this.carsRepository.create({
            ...createCarDto,
            numberOfAvailable: createCarDto.numberOfAll
        })

        const savedCar = await this.carsRepository.save(car)

        const properties = createCarDto.properties

        properties.forEach((property) => {
            this.propertiesService.create({
                name: property.name,
                value: property.value,
                carId: savedCar.id
            })
        })

        return savedCar
    }

    async findAll(): Promise<Car[]> {
        return this.carsRepository.find({ relations: ['properties'] })
    }

    async findOne(id: number): Promise<Car> {
        return this.carsRepository.findOne({ where: { id }, relations: ['properties'] })
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
