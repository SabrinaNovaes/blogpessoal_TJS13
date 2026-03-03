import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens
export class Postagem {
    
    @PrimaryGeneratedColumn() // PRIMARY KEY AUTO_INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Retira os espaços em banco do começo e do final do texto digitado pelo usuário
    @IsNotEmpty() // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, NÃO PERMITINDO QUE ELE FIQUE VAZIO
    @Column({ length: 100, nullable: false }) // VARCHAR(100) NOT NULL
    titulo: string; // Validação para garantir que o valor não está vazio 

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Retira os espaços em banco do começo e do final do texto digitado pelo usuário
    @IsNotEmpty() // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, NÃO PERMITINDO QUE ELE FIQUE VAZIO
    @Column({ length: 1000, nullable: false }) // VARCHAR(1000) NOT NULL
    texto: string;

    @UpdateDateColumn() // REGISTRA AUTOMATICAMENTE A DATA E HORA DA ÚLTIMA ATUALIZAÇÃO DO REGISTRO
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false }) // TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    data: Date;
}