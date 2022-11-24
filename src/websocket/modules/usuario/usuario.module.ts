import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AuthLoginGateway } from './events/auth-login.gateway';

@Module({
    providers: [AuthLoginGateway],
    imports: [DatabaseModule],
})
export class UsuarioModule {}
