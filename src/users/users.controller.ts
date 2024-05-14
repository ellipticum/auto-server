import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userData: any) {
        return this.usersService.create(userData)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne({ id: Number(id) })
    }
}
