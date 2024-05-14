// properties.module.ts
import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Property } from './entities/property.entity'
import { PropertiesService } from './properties.service'
import { PropertiesController } from './properties.controller'
import { CarsModule } from '../cars/cars.module' // Импортируем CarsModule

@Module({
    imports: [TypeOrmModule.forFeature([Property]), forwardRef(() => CarsModule)],
    controllers: [PropertiesController],
    providers: [PropertiesService],
    exports: [PropertiesService]
})
export class PropertiesModule {}
