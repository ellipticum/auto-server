import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { Property } from '../../properties/entities/property.entity'

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    type: string

    @Column()
    hourlyPrice: number

    @Column()
    dailyPrice: number

    @Column()
    weeklyPrice: number

    @Column()
    description: string

    @Column('simple-array')
    images: string[]

    @Column()
    isBookable: boolean

    @OneToMany(() => Property, (property) => property.car)
    properties: Property[]
}
