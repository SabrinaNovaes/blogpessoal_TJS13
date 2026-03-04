import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "./entities/tema.entitie";
import { TemaController } from "./controller/tema.controller";
import { TemaService } from "./service/tema.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tema])], // REGISTRA A ENTIDADE TEMA NO MÓDULO PARA QUE POSSA SER USADA PELO REPOSITÓRIO DO TYPEORM
    controllers: [TemaController],
    providers: [TemaService],
    exports: [TemaService]
})

export class TemaModule {}