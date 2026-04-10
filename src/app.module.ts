import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ProdService } from './data/service/prod.service';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/service/dev.service';

@Module({
  
  imports: [ // conexão com o banco de dados
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        useClass: ProdService,
        imports: [ConfigModule],
      }), // HABILITA O LOG DE CONSULTAS SQL GERADAS PELO TYPEORM, O QUE PODE SER ÚTIL PARA DEPURAÇÃO E ANÁLISE DE DESEMPENHO DURANTE O DESENVOLVIMENTO. EM AMBIENTES DE PRODUÇÃO, É RECOMENDADO DESABILITAR O LOG PARA MELHORAR O DESEMPENHO E EVITAR VAZAMENTO DE INFORMAÇÕES SENSÍVEIS NOS LOGS.
  
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }