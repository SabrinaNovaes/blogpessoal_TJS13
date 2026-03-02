import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entitie";
import { Repository } from "typeorm";

// classe repository fornece métodos para realizar operações de banco de dados, como criar, ler, atualizar e excluir registros da entidade Postagem. Ao injetar o repositório, podemos usar esses métodos para gerenciar os dados relacionados às postagens no banco de dados.

@Injectable() // DECORAÇÃO QUE PERMITE QUE ESSA CLASSE SEJA INJETADA EM OUTRAS PARTES DO PROJETO
export class PostagemService {
    
    constructor(
        @InjectRepository(Postagem) // INJETANDO O REPOSITÓRIO DA ENTIDADE POSTAGEM PARA QUE POSSAMOS REALIZAR OPERAÇÕES DE BANCO DE DADOS COM ELA
        private postagemRepository: Repository<Postagem>, // VARIÁVEL QUE RECEBE O REPOSITÓRIO INJETADO, PERMITINDO ACESSAR MÉTODOS PARA GERENCIAR OS DADOS DA ENTIDADE POSTAGEM NO BANCO DE DADOS
    ){} 

    // Promise é uma promessa de que a função findAll() retornará todos os objetos da postagem
    async findAll(): Promise<Postagem[]> { // Método assíncrono que retorna uma promessa de um array de postagens
        // SELECT * FROM tb_postagens
        return this.postagemRepository.find(); // Usa o repositório para buscar todas as postagens no banco de dados e retorna o resultado
    }
}