import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entitie"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 255, nullable: false })
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 255, nullable: false }) 
    senha: string

    @Column({length: 5000 }) 
    foto: string

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}