# Mind Your Data | Backend

API de backend desenvolvida por [Gabriel Kyomen](https://github.com/GKyomen) em novembro de 2021 para o case do processo seletivo da [Mind Consulting](https://mindconsulting.com.br/)

Visite o Frontend [clicando aqui](https://github.com/GKyomen/case-mind-frontend).

## Requisitos
* NodeJs

## Iniciando o servidor
```
$ git clone https://github.com/GKyomen/case-mind-backend.git
```
```
$ npm install
```
```
$ node /src/index.js
```

## Rotas
* [http://localhost:5000/auth/login](http://localhost:5000/auth/login) Para fazer o login de um usuário pelo método POST
* [http://localhost:5000/auth/register](http://localhost:5000/auth/register) Para fazer o registro de um novo usuário pelo método POST
* [http://localhost:5000/application/users](http://localhost:5000/application/users) Para retornar todos os usuários, exceto aquele que fez a requisição, pelo método GET (disponível apenas para usuários autenticados e com nível de acesso de administrador)
* [http://localhost:5000/application/:userId](http://localhost:5000/application/:userId) Para retornar um usuário em específico, pelo método GET (disponível apenas para usuários autenticados)
* [http://localhost:5000/application/:userId](http://localhost:5000/application/:userId) Para editar um usuário em específico, pelo método PUT (disponível apenas para usuários autenticados. Se o id de quem edita é diferente do editado, o editor também precisa ter nível de acesso de administrador)
* [http://localhost:5000/application/:userId](http://localhost:5000/application/:userId) Para deletar um usuário em específico, pelo método DELETE (disponível apenas para usuários autenticados e com nível de acesso de administrador)
