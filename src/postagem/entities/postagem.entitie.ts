import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entitie";

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens
export class Postagem {
    
    @PrimaryGeneratedColumn() // PRIMARY KEY AUTO_INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Retira os espaços em banco do começo e do final do texto digitado pelo usuário
    @IsNotEmpty({ message: "O campo não pode ser vazio"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, NÃO PERMITINDO QUE ELE FIQUE VAZIO
    @Length(5, 100, {message: "O campo deve conter no mínimo 5 caracteres"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, COM NO MÍNIMO 5 CARACTERES E NO MÁXIMO 100 CARACTERES)
    @Column({ length: 100, nullable: false }) // VARCHAR(100) NOT NULL
    titulo: string; // Validação para garantir que o valor não está vazio 

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Retira os espaços em banco do começo e do final do texto digitado pelo usuário
    @IsNotEmpty({ message: "O campo não pode ser vazio"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, NÃO PERMITINDO QUE ELE FIQUE VAZIO
    @Length(5, 1000, {message: "O campo deve conter no mínimo 5 caracteres"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, COM NO MÍNIMO 5 CARACTERES E NO MÁXIMO 100 CARACTERES)
    @Column({ length: 1000, nullable: false }) // VARCHAR(1000) NOT NULL
    texto: string;

    @UpdateDateColumn() // REGISTRA AUTOMATICAMENTE A DATA E HORA DA ÚLTIMA ATUALIZAÇÃO DO REGISTRO
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false }) // TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, { onDelete: "CASCADE" })
    tema: Tema; // chave estrangeira para a entidade tema, indicando que uma postagem pertence a um tema
}