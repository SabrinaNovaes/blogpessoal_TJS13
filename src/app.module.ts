import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entitie';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entitie';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [ // conexão com o banco de dados
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema, Usuario], // REGISTRA A ENTIDADE POSTAGEM E TEMA PARA QUE O TYPEORM POSSA GERENCIAR AS TABELAS DO BANCO DE DADOS COM BASE NELA
      synchronize: true, // Sincroniza o banco de dados com as entidades definidas no código, criando ou atualizando as tabelas conforme necessário. Isso é útil durante o desenvolvimento para garantir que o esquema do banco de dados esteja sempre atualizado com as mudanças nas entidades, mas deve ser usado com cuidado em ambientes de produção para evitar perda de dados acidental.
      logging: true, // HABILITA O LOG DE CONSULTAS SQL GERADAS PELO TYPEORM, O QUE PODE SER ÚTIL PARA DEPURAÇÃO E ANÁLISE DE DESEMPENHO DURANTE O DESENVOLVIMENTO. EM AMBIENTES DE PRODUÇÃO, É RECOMENDADO DESABILITAR O LOG PARA MELHORAR O DESEMPENHO E EVITAR VAZAMENTO DE INFORMAÇÕES SENSÍVEIS NOS LOGS.
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}