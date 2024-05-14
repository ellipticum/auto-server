import { CreatePropertyDto } from '../../properties/dto/create-property.dto'

export class CreateCarDto {
    name: string
    type: string
    hourlyPrice: number
    dailyPrice: number
    weeklyPrice: number
    description: string
    images: string[]
    properties: CreatePropertyDto[]
    numberOfAll: number
}
