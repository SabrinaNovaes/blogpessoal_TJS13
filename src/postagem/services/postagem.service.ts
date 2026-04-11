import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { TemaService } from "../../tema/service/tema.service";

// classe repository fornece métodos para realizar operações de banco de dados, como criar, ler, atualizar e excluir registros da entidade Postagem. Ao injetar o repositório, podemos usar esses métodos para gerenciar os dados relacionados às postagens no banco de dados.

@Injectable() // DECORAÇÃO QUE PERMITE QUE ESSA CLASSE SEJA INJETADA EM OUTRAS PARTES DO PROJETO
export class PostagemService {

    constructor(
        @InjectRepository(Postagem) // INJETANDO O REPOSITÓRIO DA ENTIDADE POSTAGEM PARA QUE POSSAMOS REALIZAR OPERAÇÕES DE BANCO DE DADOS COM ELA
        private postagemRepository: Repository<Postagem>, // VARIÁVEL QUE RECEBE O REPOSITÓRIO INJETADO, PERMITINDO ACESSAR MÉTODOS PARA GERENCIAR OS DADOS DA ENTIDADE POSTAGEM NO BANCO DE DADOS
        private readonly temaService: TemaService // INJETANDO O SERVIÇO DE TEMA PARA QUE POSSAMOS USAR SEUS MÉTODOS DENTRO DO SERVIÇO DE POSTAGEM, COMO VERIFICAR SE UM TEMA EXISTE ANTES DE CRIAR OU ATUALIZAR UMA POSTAGEM
    ) {}

    // Promise é uma promessa de que a função findAll() retornará todos os objetos da postagem
    async findAll(): Promise<Postagem[]> { // Método assíncrono que retorna uma promessa de um array de postagens
        // SELECT * FROM tb_postagens
        return this.postagemRepository.find({ 
            relations: { tema: true, usuario: true }
        }); // Usa o repositório para buscar todas as postagens no banco de dados e retorna o resultado
    }

    async findById(id: number): Promise<Postagem> {
        // SELECT * FROM tb_postagens WHERE id = id
        const postagem = await this.postagemRepository.findOne({
            where: { id },
            relations: { tema: true, usuario: true }
        })

        // VERIFICA SE A POSTAGEM EXISTE, SE NÃO EXISTIR LANÇA UMA EXCEPTION HTTP COM O STATUS NOT_FOUND (404) 
        if(!postagem) 
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND); // Lança uma exceção Http com mensagem

        return postagem; // Retorna a postagem encontrada no banco de dados 
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        // SELECT * FROM tb_postagens WHERE titulo LIKE '%titulo%'
        return this.postagemRepository.find({
            where: { titulo: ILike(`%${titulo}%`)},
            relations: { tema: true, usuario: true }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        
        this.temaService.findById(postagem.tema.id); // VERIFICA SE O TEMA EXISTE, SE NÃO EXISTIR LANÇA UMA EXCEPTION HTTP COM O STATUS NOT_FOUND (404)
        
        // INSERT INTO tb_postagens (titulo, texto) VALUES (? , ?)
        return await this.postagemRepository.save(postagem); // Usa o repositorio para salvar a nova postagem no banco de dados e retorna a postagem salva com o id gerado 
    }

    async update(postagem: Postagem): Promise<Postagem> {
        // UPDATE tb_postagens SET titulo = ?, texto = ? WHERE id = ?, data = CURRENT_TIMESTAMP() WHERE id = ?

        if(!postagem.id || postagem.id <= 0) // VERIFICA SE O ID DA POSTAGEM FOI INFORMADO, SE NÃO FOR INFORMADO LANÇA UMA EXCEPTION HTTP COM O STATUS BAD_REQUEST (400)
            throw new HttpException('ID da postagem inválido!', HttpStatus.BAD_REQUEST);

        await this.findById(postagem.id); // VERIFICA SE A POSTAGEM EXISTE, SE NÃO EXISTIR LANÇA UMA EXCEPTION HTTP COM O STATUS NOT_FOUND (404)
        
        await this.temaService.findById(postagem.tema.id); // VERIFICA SE O TEMA EXISTE, SE NÃO EXISTIR LANÇA UMA EXCEPTION HTTP COM O STATUS NOT_FOUND (404)
        
        return await this.postagemRepository.save(postagem); // Usa o repositorio para atualizar a postagem no banco de dados e retorna a postagem atualizada
    }
    
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id); // VERIFICA SE A POSTAGEM EXISTE, SE NÃO EXISTIR LANÇA UMA EXCEPTION HTTP COM O STATUS NOT_FOUND (404)
        // DELETE FROM tb_postagens WHERE id = ?
        return await this.postagemRepository.delete(id);
    } 

    // Função Likes
    async like(id: number): Promise<Postagem> {

        let buscarPostagem = await this.findById(id);

        if (!buscarPostagem)
            throw new HttpException('Postagem não encontrado!', HttpStatus.NOT_FOUND);

        let novaCurtida = buscarPostagem.like + 1;

        return await this.postagemRepository.save({
            ...buscarPostagem,
            like: novaCurtida
        });
    }

    // Função Comentar
    async comentario(id: number, texto: string): Promise<Postagem> {

    let buscarPostagem = await this.findById(id);

    if (!buscarPostagem)
        throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return await this.postagemRepository.save({
        ...buscarPostagem,
        comentario: texto
    });
}

}