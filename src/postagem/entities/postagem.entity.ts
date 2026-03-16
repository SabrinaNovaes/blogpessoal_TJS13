import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens
export class Postagem {
    
    @ApiProperty() 
    @PrimaryGeneratedColumn() // PRIMARY KEY AUTO_INCREMENT
    id: number;

    @ApiProperty() 
    @Transform(({ value }: TransformFnParams) => value?.trim()) // Retira os espaços em banco do começo e do final do texto digitado pelo usuário
    @IsNotEmpty({ message: "O campo não pode ser vazio"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, NÃO PERMITINDO QUE ELE FIQUE VAZIO
    @Length(5, 100, {message: "O campo deve conter no mínimo 5 caracteres"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, COM NO MÍNIMO 5 CARACTERES E NO MÁXIMO 100 CARACTERES)
    @Column({ length: 100, nullable: false }) // VARCHAR(100) NOT NULL
    titulo: string; // Validação para garantir que o valor não está vazio 

    @ApiProperty() 
    @Transform(({ value }: TransformFnParams) => value?.trim()) // Retira os espaços em banco do começo e do final do texto digitado pelo usuário
    @IsNotEmpty({ message: "O campo não pode ser vazio"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, NÃO PERMITINDO QUE ELE FIQUE VAZIO
    @Length(5, 1000, {message: "O campo deve conter no mínimo 5 caracteres"}) // FORÇA A DIGITAÇÃO DE UM VALOR PARA O CAMPO, COM NO MÍNIMO 5 CARACTERES E NO MÁXIMO 100 CARACTERES)
    @Column({ length: 1000, nullable: false }) // VARCHAR(1000) NOT NULL
    @ApiProperty()
    texto: string;

    // @UpdateDateColumn() // REGISTRA AUTOMATICAMENTE A DATA E HORA DA ÚLTIMA ATUALIZAÇÃO DO REGISTRO
    // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false }) // TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    // data: Date;

    @ApiProperty() 
    @UpdateDateColumn()
    data: Date;

    @ApiProperty({ type: () => Tema }) 
    @ManyToOne(() => Tema, (tema) => tema.postagem, { onDelete: "CASCADE" })
    tema: Tema; // chave estrangeira para a entidade tema, indicando que uma postagem pertence a um tema

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, { onDelete: "CASCADE" })
    usuario: Usuario[]
}