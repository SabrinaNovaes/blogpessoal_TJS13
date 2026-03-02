import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entitie';

@Module({
  imports: [ // conexão com o banco de dados
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem], // REGISTRA A ENTIDADE POSTAGEM PARA QUE O TYPEORM POSSA GERENCIAR AS TABELAS DO BANCO DE DADOS COM BASE NELA
      synchronize: true, // Sincroniza o banco de dados com as entidades definidas no código, criando ou atualizando as tabelas conforme necessário. Isso é útil durante o desenvolvimento para garantir que o esquema do banco de dados esteja sempre atualizado com as mudanças nas entidades, mas deve ser usado com cuidado em ambientes de produção para evitar perda de dados acidental.
    }),
    PostagemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}