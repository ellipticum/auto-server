import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(login: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({ login })
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(data: any) {
        const user = await this.usersService.findOne({ login: data.login })

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        return {
            result: this.jwtService.sign({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            })
        }
    }

    async register(userDto: any): Promise<any> {
        const { login } = userDto
        const existingUser = await this.usersService.findOne({ login })
        if (existingUser) {
            throw new ConflictException('Пользователь уже есть')
        }
        const user = await this.usersService.create(userDto)

        return {
            result: this.jwtService.sign({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            })
        }
    }
}
