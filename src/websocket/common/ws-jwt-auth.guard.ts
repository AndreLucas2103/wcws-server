import { UsuarioService } from '@/database/usuario/usuario.service';
import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
    constructor(private permissao?: string) {}

    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const bearerToken = context.args[0].handshake.auth.token;

        return false;
    }
}
