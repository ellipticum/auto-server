import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body) {
        return this.authService.login(body)
    }

    @Post('registration')
    async register(@Body() body) {
        return this.authService.register(body)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        return req.user
    }
}
