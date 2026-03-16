import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UsuarioLogin } from './../entities/usuariologin.entity';
import { AuthService } from '../service/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard) // endpoint de login protegido pela estrategy
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }
}