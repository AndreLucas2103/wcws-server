import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<
        boolean | any | Promise<boolean | any> | Observable<boolean | any>
    > {
        const data = context.getArgs()[0].data as {
            usuario?: { _id: string; administrador: boolean };
            chat?: { _id: string };
        };

        if (data.chat) return true;

        if (data.usuario) return true;

        return false;
    }
}
