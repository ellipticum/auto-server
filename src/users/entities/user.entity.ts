// users.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Order } from '../../orders/entities/order.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    login: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}
