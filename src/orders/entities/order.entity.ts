import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { User } from '../../users/entities/user.entity'
import { Car } from '../../cars/entities/car.entity'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Car)
    car: Car

    @Column()
    bookingTime: number

    @Column()
    bookingDuration: number
}
