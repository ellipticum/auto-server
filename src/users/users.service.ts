import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async findOne({ id, login }: { id?: number; login?: string }): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: { login, id },
            relations: ['orders', 'orders.car']
        })
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async create(userData: any) {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const user = this.usersRepository.create({
            login: userData.login,
            password: hashedPassword,
            firstName: userData.firstName,
            lastName: userData.lastName
        })

        return this.usersRepository.find({
            where: { id: user.id },
            relations: ['orders', 'orders.car']
        })
    }
}
