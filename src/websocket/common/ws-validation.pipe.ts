import { Injectable, ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WSValidationPipe extends ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
        });
    }

    createExceptionFactory() {
        return (validationErrors = []) => {
            if (this.isDetailedOutputDisabled) {
                return new WsException('Bad request');
            }
            const errors = this.flattenValidationErrors(validationErrors);

            return new WsException({ status: 'error', message: errors });
        };
    }
}
