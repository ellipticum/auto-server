import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from '../lib/filters/all-exceptions.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true
    })

    app.setGlobalPrefix('api')
    app.useGlobalFilters(new AllExceptionsFilter())

    await app.listen(8000)
}

bootstrap()
