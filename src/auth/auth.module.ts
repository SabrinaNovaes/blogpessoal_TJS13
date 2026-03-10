import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { LocalStrategy } from "./strategy/local-strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsuarioModule } from "../usuario/usuario.module";
import { jwtConstants } from "./constants/constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./service/auth.service";

@Module({
    imports: [UsuarioModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },

    })],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {};