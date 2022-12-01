import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AuthLoginGateway } from './events/auth-login.gateway';
import { TesteGateway } from './events/teste.gateway';

@Module({
    providers: [AuthLoginGateway, TesteGateway],
    imports: [DatabaseModule],
})
export class UsuarioModule {}
