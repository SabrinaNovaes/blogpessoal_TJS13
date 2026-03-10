import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './service/usuario.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        forwardRef(() => AuthModule)
    ],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})
export class UsuarioModule { }