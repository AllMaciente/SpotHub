# PLAN.md

## Objetivo do Projeto

Desenvolver uma plataforma centralizada para gestão e reserva de espaços físicos (salas de aula, escritórios, estações de coworking e salas de reunião), permitindo o controle de disponibilidade em tempo real e a gestão de usuários.

## Público-alvo

- Instituições de ensino (faculdades, escolas).

- Espaços de Coworking.

- Empresas com regime de trabalho híbrido.

## Requisitos Funcionais

- [x] RF01: Gestão de Usuários: O sistema deve permitir o cadastro, edição e login de usuários com diferentes níveis de acesso (Admin, Gestor, Usuário Comum).

- [x] RF02: Gestão de Salas: Administradores devem poder cadastrar salas com atributos como capacidade, recursos (projetor, ar-condicionado), localização.

- [x] RF03: Reserva de Espaços: Usuários devem poder buscar salas disponíveis por data/horário e realizar a reserva.

- [x] RF04: Validação de Conflitos: O sistema deve impedir que duas reservas ocupem o mesmo espaço no mesmo intervalo de tempo.

- [x] RF05: Cancelamento: Possibilidade de cancelar reservas respeitando regras de antecedência.

## Requisitos Não Funcionais

- [x] RNF01: Segurança: Autenticação via JWT (JSON Web Token) e proteção de rotas por RBAC (Role-Based Access Control).

## Stack Tecnológico

### Frontend

### Backend

- Framework: NestJS.

- ORM: Prisma.

- Documentação: Swagger (OpenAPI).

### Banco de Dados

- Relacional: PostgreSQL.

### Infraestrutura

### Ferramentas
