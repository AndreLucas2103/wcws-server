import { AppError } from '@/api/error/AppError';
import { HttpException, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception instanceof AppError) {
            return response.status(exception.statusCode).json({
                erro: {
                    statusCode: exception.statusCode,
                    mensagem: exception.message,
                    detalhe: exception.detalhe || null,
                    codigoPermissao: exception.codPermissao || null,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                },
            });
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const responseError: any = exception.getResponse();

            response.status(status).json({
                erro: {
                    statusCode: exception.getStatus(),
                    mensagem: responseError.error,
                    detalhe: responseError.message || null,
                    codigoPermissao: null,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                },
            });
        }

        response.status(500).json({
            erro: {
                statusCode: 500,
                mensagem: 'Ocorreu um erro no servidor',
                detalhe:
                    'Falha gerada no servidor, provavelmente validações incorretas',
                codigoPermissao: null,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        });
    }
}
