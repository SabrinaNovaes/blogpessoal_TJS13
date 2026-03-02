# Projeto Blog Pessoal — Backend com NestJS

<br />

<div align="center">
    <img src="https://i.imgur.com/O6PILGE.png" title="source: imgur.com" /> 
</div>


<br />

<div align="center">
  <img src="https://img.shields.io/github/languages/top/SabrinaNovaes/blogpessoal_nest_tjs13?style=flat-square" />
  <img src="https://img.shields.io/github/repo-size/SabrinaNovaes/blogpessoal_nest_tjs13?style=flat-square" />
  <img src="https://img.shields.io/github/languages/count/SabrinaNovaes/blogpessoal_nest_tjs13?style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/SabrinaNovaes/blogpessoal_nest_tjs13?style=flat-square" />
  <img src="https://img.shields.io/github/issues/SabrinaNovaes/blogpessoal_nest_tjs13?style=flat-square" />
  <img src="https://img.shields.io/github/issues-pr/SabrinaNovaes/blogpessoal_nest_tjs13?style=flat-square" />
  <img src="https://img.shields.io/badge/status-construção-yellow" alt="Status: Em Construção">

</div>

<br />

## Descrição



O **Blog Pessoal** é uma API backend que permite que usuários publiquem, editem e visualizem postagens relacionadas a diferentes temas de forma organizada e segura.

O projeto foi desenvolvido com fins educacionais, simulando uma aplicação real utilizada em ambientes profissionais, com foco na construção de **APIs REST escaláveis utilizando NestJS e TypeScript**.

Entre os principais recursos disponíveis:

1. Criação, edição e exclusão de postagens
2. Associação de postagens a temas específicos
3. Cadastro e autenticação de usuários
4. Consulta de postagens por tema ou usuário
5. Controle de acesso em operações protegidas

------

## Sobre esta API



A API foi desenvolvida utilizando **Node.js**, **NestJS** e **TypeScript**, seguindo princípios de:

- Arquitetura modular
- Separação de responsabilidades
- Padrão REST
- Boas práticas de organização de código backend

A aplicação disponibiliza endpoints para gerenciamento dos recursos:

- **Usuário**
- **Postagem**
- **Tema**

permitindo a interação entre usuários e conteúdos publicados.

------

### Principais funcionalidades da API



1. Cadastro, autenticação e atualização de usuários
2. Gerenciamento de temas para classificação das postagens
3. Criação, edição, listagem e exclusão de postagens
4. Relacionamento entre postagens, autores e temas
5. Autenticação baseada em **JWT** para proteção das rotas

------

## Diagrama de Classes



O diagrama abaixo representa a estrutura lógica das entidades da aplicação e seus relacionamentos dentro da API.

```mermaid
classDiagram
class Postagem {
  id : number
  titulo : string
  texto : string
  data : Date
  tema : Tema
  usuario : Usuario
}

class Tema {
  id : number
  descricao : string
  postagens : Postagem[]
}

class Usuario {
  id : number
... (341 linhas)
