import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Property } from './entities/property.entity'
import { CreatePropertyDto } from './dto/create-property.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'

@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(Property)
        private propertyRepository: Repository<Property>
    ) {}

    async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
        const property = this.propertyRepository.create(createPropertyDto)
        return this.propertyRepository.save(property)
    }

    async findAll(): Promise<Property[]> {
        return this.propertyRepository.find()
    }

    async findOne(id: number): Promise<Property> {
        return this.propertyRepository.findOne({
            where: { id }
        })
    }

    async update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
        const property = await this.propertyRepository.preload({
            id: id,
            ...updatePropertyDto
        })
        if (!property) {
            throw new Error(`Property #${id} not found`)
        }
        return this.propertyRepository.save(property)
    }

    async remove(id: number): Promise<void> {
        await this.propertyRepository.delete(id)
    }
}
