import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        // Определение статуса HTTP ответа
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR

        // Формирование сообщения об ошибке
        const message =
            exception instanceof HttpException
                ? exception.getResponse() // Возвращает объект или строку в зависимости от ошибки
                : 'Internal server error'

        // Нормализация сообщения для единообразия ответа
        const errorMessage =
            typeof message === 'object' && 'message' in message
                ? message['message'] // для случаев, когда message содержит объект
                : message

        response.status(status).json({
            error: errorMessage
        })
    }
}
