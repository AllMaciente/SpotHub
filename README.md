# SpotHub

API backend para sistema de reserva de salas de reunião.

## Tech Stack

- **NestJS** - Framework Node.js
- **PostgreSQL** - Banco de dados
- **Prisma** - ORM
- **TypeScript** - Linguagem
- **JWT** - Autenticação
- **Swagger/OpenAPI** - Documentação

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL

### Installation

```bash
cd app/backend
npm install
```

### Environment

Crie um arquivo `.env` com:

```
DATABASE_URL="postgresql://user:password@localhost:5432/spothub"
JWT_SECRET="your-secret-key"
PORT=3000
```

### Run

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## API Documentation

A documentação está disponível em `/docs` após iniciar o servidor.

## Features

- Autenticação JWT com roles (ADMIN, GESTOR, USER)
- Gestão de salas
- Reserva de espaços com validação de conflitos
- Cancelamento de reservas
- Sistema de paginação

## API Endpoints

### Auth
- `POST /auth/signup` - Cadastro
- `POST /auth/signin` - Login
- `GET /auth/me` - Usuário atual

### Rooms
- `POST /rooms` - Criar sala (ADMIN/GESTOR)
- `GET /rooms` - Listar salas
- `GET /rooms/:id` - Detalhar sala
- `PATCH /rooms/:id` - Atualizar sala (ADMIN/GESTOR)

### Reservations
- `POST /reservations` - Criar reserva
- `GET /reservations/me` - Minhas reservas
- `GET /reservations` - Listar todas (ADMIN/GESTOR)
- `DELETE /reservations/:id` - Cancelar reserva

### Users
- `GET /user/get-all` - Listar usuários (ADMIN)
- `POST /user/update` - Atualizar perfil
