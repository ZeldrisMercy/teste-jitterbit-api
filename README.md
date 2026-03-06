# 🧪 Desafio Técnico - Analista de Sistemas Jr (Jitterbit)

Este repositório contém a solução para o teste prático de desenvolvimento de uma API para gerenciamento de pedidos, solicitado pela Jitterbit.

O objetivo do desafio é desenvolver uma API capaz de receber dados em formato JSON com campos em português, realizar o mapeamento e transformação para inglês, e persistir as informações em um banco de dados SQL seguindo boas práticas de desenvolvimento.

---

# 🚀 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript no servidor  
- **Express** — Framework web para criação das rotas da API  
- **Sequelize** — ORM para mapeamento objeto-relacional  
- **SQLite** — Banco de dados relacional baseado em arquivo  
- **Nodemon** — Ferramenta para reinicialização automática do servidor durante o desenvolvimento  

---

# 📋 Requisitos do Desafio

A API foi desenvolvida seguindo os critérios solicitados no desafio técnico.

## 🔄 Transformação de Dados

A API recebe dados em **português** e converte automaticamente para **inglês** antes de persistir no banco.

### Entrada (JSON recebido)

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valor Total": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

### Estrutura persistida no banco (Inglês)

| Português | Inglês |
|-----------|--------|
| numeroPedido | orderId |
| valor Total | value |
| dataCriacao | creationDate |
| idItem | itemId |
| quantidadeItem | quantity |
| valorItem | price |

---

# 🗄️ Estrutura do Banco de Dados

O projeto utiliza **SQLite** com relacionamento entre tabelas.

### Tabela `Orders`

| Campo | Tipo |
|------|------|
| id | INTEGER |
| orderId | STRING |
| value | FLOAT |
| creationDate | DATE |

### Tabela `Items`

| Campo | Tipo |
|------|------|
| id | INTEGER |
| itemId | STRING |
| quantity | INTEGER |
| price | FLOAT |
| orderId | FOREIGN KEY |

### Relacionamento

```
Order 1 -------- N Items
```

Um **pedido pode possuir vários itens**.

---

# ⚙️ Funcionalidades Implementadas

## CRUD Completo

A API possui as seguintes operações:

- ✅ Criar pedido  
- ✅ Buscar pedido por ID  
- ✅ Listar pedidos  
- ✅ Atualizar pedido  
- ✅ Remover pedido  

---

# 🛠️ Como rodar o projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/ZeldrisMercy/teste-jitterbit-api.git
cd teste-jitterbit-api
```

---

## 2️⃣ Instalar as dependências

Este comando instalará todos os pacotes listados no `package.json`.

```bash
npm install
```

---

## 3️⃣ Iniciar o servidor

O projeto utiliza **Nodemon** para facilitar o desenvolvimento.

```bash
npm run dev
```

O servidor estará disponível em:

```
http://localhost:3000
```

---

# 🧪 Exemplo de Teste da API

## Criar Pedido

Você pode testar a criação de um pedido utilizando **curl**.

### Windows (CMD / PowerShell)

```bash
curl -X POST http://localhost:3000/order -H "Content-Type: application/json" -d "{\"numeroPedido\": \"v10089015vdb-01\", \"valor Total\": 10000, \"dataCriacao\": \"2023-07-19T12:24:11.5299601+00:00\", \"items\": [{\"idItem\": \"2434\", \"quantidadeItem\": 1, \"valorItem\": 1000}]}"
```

---

# 📡 Endpoints Disponíveis

## Criar Pedido

```
POST /order
```

Cria um novo pedido e realiza o **mapeamento automático dos campos**.

---

## Listar Pedidos

```
GET /order/list
```

Retorna todos os pedidos cadastrados.

---

## Buscar Pedido por ID

```
GET /order/:id
```

Retorna um pedido específico baseado no **número do pedido**.

---

## Atualizar Pedido

```
PUT /order/:id
```

Atualiza os dados de um pedido existente.

---

## Remover Pedido

```
DELETE /order/:id
```

Remove um pedido e todos os **itens vinculados**.

---

# 🧱 Estrutura do Projeto

```
TESTE-JITTERBIT-API
│
├── node_modules
│
├── src
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── .gitignore
├── database.sqlite
├── package.json
├── package-lock.json
└── README.md
```

---

# 🧠 Boas Práticas Aplicadas

- Arquitetura **MVC**
- Tratamento de erros
- Status HTTP adequados
- Relacionamento SQL
- Separação de responsabilidades
- Código modular

---

# 👨‍💻 Autor

Desenvolvido por **Ícaro de Souza Mariano**

GitHub:  
https://github.com/ZeldrisMercy
