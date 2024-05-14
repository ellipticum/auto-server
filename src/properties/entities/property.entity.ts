// property.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { Car } from '../../cars/entities/car.entity'

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    value: string

    @ManyToOne(() => Car, (car) => car.properties)
    car: Car
}
