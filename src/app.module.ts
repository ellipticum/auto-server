import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CarsModule } from './cars/cars.module'
import { OrdersModule } from './orders/orders.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'cars',
            autoLoadEntities: true,
            synchronize: true
        }),
        AuthModule,
        UsersModule,
        CarsModule,
        OrdersModule
    ]
})
export class AppModule {}
