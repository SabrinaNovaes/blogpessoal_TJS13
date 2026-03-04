import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entitie";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ) {}

    async findAll(): Promise<Tema[]> {
        //SELECT * FROM tb_temas
        return this.temaRepository.find({ relations: { postagem: true }});
    }

    async findById(id: number): Promise<Tema> {
        //SELECT * FROM tb_temas WHERE id = ? 
        const tema = await this.temaRepository.findOne({
            where: { id },
            relations: { postagem: true }
        })

        if(!tema)
            throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);
        
        return tema;
    }

    async findAllByDescricao(descricao: string): Promise<Tema[]> {
        //SELECT * FROM tb_temas WHERE descricao LIKE '%descricao%'
        return this.temaRepository.find({
            where: { descricao: ILike(`%${descricao}%`) },
            relations: { postagem: true }
        })
    }

    async create (tema: Tema): Promise<Tema> {
        //INSERT INTO tb_temas (descricao) VALUES (?)
        return await this.temaRepository.save(tema);
    }

    async update (tema: Tema): Promise<Tema>{
        //UPDATE tb_temas SET descricao = ? WHERE id = ?, data = CURRENT_TIMESTAMP() WHERE id = ?
        
        if(!tema.id || tema.id <= 0)
            throw new HttpException('ID do tema inválido!', HttpStatus.BAD_REQUEST);

        await this.findById(tema.id);
        return await this.temaRepository.save(tema);
    }

    async delete (id: number) {
        //DELETE FROM tb_temas WHERE id = ?
        await this.findById(id);
        return await this.temaRepository.delete(id);
    }
}
