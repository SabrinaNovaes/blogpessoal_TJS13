import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {

  let token: any;
  let usuarioId, temaId, temaDescricao: any;
  let app: INestApplication<App>;

  //beforeEach - executa um por vez a cada vez
  // beforeAll executa todos de uma vez
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"], // variavel que pega o diretorio raiz da aplicação concatenado com o caminho da aplicação
          synchronize: true,
          dropSchema: true,
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  //depois de rodar o teste, fecha
  afterAll(async () => {
    await app.close();
  })

  it("01 - Deve Cadastrar um novo Usuário", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-'
      })
    expect(resposta.status).toBe(201)

    usuarioId = resposta.body.id;
  })

  it("02 - Não Deve Cadastrar um Usuário já existente", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-'
      })
    expect(resposta.status).toBe(400)
  })

  it("03 - Deve Autenticar um Usuário Cadastrado", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com.br',
        senha: 'rootroot',
      })
    expect(resposta.status).toBe(200)

    token = resposta.body.token;
  })

  it("04 - Deve Listar Todos os Usuários Cadastrados", async () => {
    const resposta = await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)

    expect(resposta.status).toBe(200)
  })

  it("05 - Deve Listar Usuarios por Id", async () => {
    const resposta = await request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set('Authorization', `${token}`)

    expect(resposta.status).toBe(200)
    expect(resposta.body.id).toBe(usuarioId);
  })

  it("06 - Deve Atualizar os dados de um Usuário já existente", async () => {
    const resposta = await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-',
      })
    expect(resposta.status).toBe(200)
  })

  // TESTE TEMAS 
  
  it("01 - Deve Cadastrar Novos Temas", async () => {
    const resposta = await request(app.getHttpServer())
    .post('/temas')
    .set('Authorization', `${token}`)
    .send({
      descricao: "Tema teste"
    })

  expect(resposta.status).toBe(201)
  temaId = resposta.body.id
  })

  it("02 - Não Deve Cadastrar um Tema já existente", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/temas')
      .send({
        descricao: temaDescricao
      })
    expect(resposta.status).toBe(400)
  })

  it("03 - Deve Atualizar o Tema", async () => {
    const resposta = await request(app.getHttpServer())
    .put('/temas')
    .set('Authorization', `${token}`)
    .send({
      id: temaId,
      descricao: "Novo Tema"
    })
    expect(resposta.status).toBe(200)
    temaId = resposta.body.id
  })

  it("04 - Deve Listar Todos os Temas", async () => {
    const resposta = await request(app.getHttpServer())
    .get('/temas')
    .set('Authorization', `${token}`)
  
    expect(resposta.status).toBe(200)
  })

  it("05 - Deve Listar Temas por Id", async () => {
    const resposta = await request(app.getHttpServer())
    .get(`/temas/${temaId}`)
    .set('Authorization', `${token}`)

    expect(resposta.status).toBe(200)
    expect(resposta.body.id).toBe(temaId)
  })

  it("06 - Deve Listar Temas por Descrição", async () => {
  const resposta = await request(app.getHttpServer())
    .get(`/temas/descricao/${temaDescricao}`)
    .set('Authorization', `Bearer ${token}`)

  expect(resposta.status).toBe(200)
  })

  it("07 - Deve Deletar Temas", async () => {
  const resposta = await request(app.getHttpServer())
    .delete(`/temas/${temaId}`)
    .set('Authorization', `${token}`)

  expect(resposta.status).toBe(204)
  })

})