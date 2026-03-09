# PLAN.md

## Objetivo do Projeto

Desenvolver uma plataforma centralizada para gestão e reserva de espaços físicos (salas de aula, escritórios, estações de coworking e salas de reunião), permitindo o controle de disponibilidade em tempo real e a gestão de usuários.

## Público-alvo

- Instituições de ensino (faculdades, escolas).

- Espaços de Coworking.

- Empresas com regime de trabalho híbrido.

## Requisitos Funcionais

- [ ] RF01: Gestão de Usuários: O sistema deve permitir o cadastro, edição e login de usuários com diferentes níveis de acesso (Admin, Gestor, Usuário Comum).

- [ ] RF02: Gestão de Salas: Administradores devem poder cadastrar salas com atributos como capacidade, recursos (projetor, ar-condicionado), localização e fotos.

- [ ] RF03: Reserva de Espaços: Usuários devem poder buscar salas disponíveis por data/horário e realizar a reserva.

- [ ] RF04: Validação de Conflitos: O sistema deve impedir que duas reservas ocupem o mesmo espaço no mesmo intervalo de tempo.

- [ ] RF05: Dashboard de Ocupação: Visualização em calendário ou lista das reservas atuais e futuras.

- [ ] RF06: Cancelamento: Possibilidade de cancelar reservas respeitando regras de antecedência.

## Requisitos Não Funcionais

- [ ] RNF01: Segurança: Autenticação via JWT (JSON Web Token) e proteção de rotas por RBAC (Role-Based Access Control).

- [ ] RNF02: Performance: Consultas de disponibilidade devem responder em menos de 200ms.

- [ ] RNF03: Concorrência: O banco de dados deve utilizar transações (ACID) para garantir a integridade das reservas em acessos simultâneos.

- [ ] RNF04: Responsividade: A interface deve ser adaptável para dispositivos móveis e desktop.

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
