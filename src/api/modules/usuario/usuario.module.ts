import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuarioController } from './usuario.controller';

@Module({
    controllers: [UsuarioController, AuthController],
    imports: [DatabaseModule],
})
export class UsuarioModule {}
