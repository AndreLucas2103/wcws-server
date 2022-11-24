import { CanActivate, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';

@Injectable()
export class WsGuard implements CanActivate {
    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const bearerToken = context.args[0].handshake.auth;

        console.log(bearerToken);

        return false;
    }
}
