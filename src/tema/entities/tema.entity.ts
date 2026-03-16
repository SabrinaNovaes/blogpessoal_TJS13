import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_temas" }) // CREATE TABLE tb_temas
export class Tema {

    @PrimaryGeneratedColumn() // PRIMARY KEY AUTO_INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Retira os espaços em banco do começo e do final do texto digitado pelo usuário
    @IsNotEmpty({ message: "O campo não pode ser vazio"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, NÃO PERMITINDO QUE ELE FIQUE VAZIO
    @Length(5, 255, {message: "O campo deve conter no mínimo 5 caracteres"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, COM NO MÍNIMO 5 CARACTERES E NO MÁXIMO 100 CARACTERES)
    @Column({ length: 255, nullable: false }) // VARCHAR(255) NOT NULL
    @ApiProperty() 
    descricao: string; // Validação para garantir que o valor não está vazio

    @ApiProperty() 
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]; // chave estrangeira para a entidade postagem, indicando que um tema pode ter várias postagens
}
