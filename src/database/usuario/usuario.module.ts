import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './usuario.schema';
import { UsuarioService } from './usuario.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Usuario.name, schema: UsuarioSchema },
        ]),
    ],
    providers: [UsuarioService],
    exports: [UsuarioService],
})
export class UsuarioModule {}
