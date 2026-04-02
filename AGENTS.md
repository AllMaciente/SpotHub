# AGENTS.md

## Visão Geral do Projeto

## Estrutura do Projeto

```
app/              # Código fonte do projeto
docs/             # Documentação
  wireframes/     # Wireframes do projeto
  diagrams/       # Diagramas técnicos
```

## Project Overview

SpotHub is a NestJS backend API for room reservation management with PostgreSQL/Prisma. The project uses TypeScript, Zod for DTO validation, JWT authentication, and Swagger/OpenAPI documentation.

## Project Structure

```
app/backend/
├── src/
│   ├── auth/           # Authentication module (signin, signup, JWT)
│   ├── rooms/          # Rooms management module
│   ├── reservations/   # Reservations module
│   ├── user/           # User management module
│   ├── common/         # Shared decorators, guards, DTOs
│   ├── prisma/         # Prisma service
│   ├── hash/           # Password hashing service
│   ├── snowflake/      # ID generation service
│   └── main.ts         # Application entry point
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Database migrations
└── package.json
```

## Commands

### Development
```bash
cd app/backend

# Start development server (watches for changes)
npm run start:dev

# Start production build
npm run start:prod

# Run with custom env file
npm run start -- --env-file .env.custom
```

### Database
```bash
# Run migrations (dev)
npm run db:migrate:dev

# Open Prisma Studio (database GUI)
npm run db:studio:dev

# Seed database
npm run db:seed
```

### Linting & Formatting
```bash
# Lint all files and fix
npm run lint

# Format code
npm run format
```

### Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run a single test file
npm run test -- auth.service.spec.ts

# Run tests matching a pattern
npm run test -- --testNamePattern="signup"
```

## Code Style Guidelines

### General
- Use TypeScript with strict mode enabled
- Use ESLint and Prettier for code quality
- All files must pass linting before committing
- Use English for all code, comments, and documentation
- Prefer async/await over raw promises

### Naming Conventions
- **Files**: kebab-case (e.g., `auth.service.ts`, `create-room.dto.ts`)
- **Classes**: PascalCase (e.g., `AuthService`, `CreateRoomDto`)
- **Interfaces**: PascalCase (e.g., `User`, `Room`)
- **Enums**: PascalCase with UPPER_CASE values (e.g., `Role.ADMIN`)
- **Methods/variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE

### Imports
- Use absolute imports from `src/` root (configured in tsconfig)
- Order imports:
  1. External libraries (@nestjs/*, zod, etc.)
  2. Internal modules (src/auth/*, src/rooms/*)
- Use named exports for services and DTOs

```typescript
// Good
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
```

### DTOs (Data Transfer Objects)
- Use Zod for validation with `nestjs-zod`
- Create Zod schema first, then extend with `createZodDto`
- Use `.describe()` for Swagger documentation

```typescript
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const CreateRoomSchema = z.object({
  name: z.string().min(1).describe('Room name'),
  capacity: z.number().int().positive(),
  resources: z.array(z.string()).optional(),
  location: z.string().optional(),
});

export class CreateRoomDto extends createZodDto(CreateRoomSchema) {}
```

### Controllers
- Use NestJS decorators for routing
- Add Swagger decorators (`@ApiOperation`, `@ApiResponse`, etc.)
- Use `@UseGuards` for authentication and authorization
- Define role-based access with `@Roles` decorator
- Return plain objects, not database entities

### Services
- Use dependency injection via constructor
- Handle business logic in services
- Throw appropriate NestJS exceptions
- Use Prisma service for database operations

```typescript
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hash: HashService,
    private jwt: JwtService,
  ) {}

  async signin(data: SigninDto) {
    const user = await this.prisma.user.findUnique({ ... });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // ...
  }
}
```

### Error Handling
- Use NestJS built-in exceptions (`NotFoundException`, `UnauthorizedException`, `BadRequestException`, `ForbiddenException`)
- Create custom exceptions when needed
- Use exception filters for global error handling

### Database (Prisma)
- Use Prisma Client for all database operations
- Follow the schema in `prisma/schema.prisma`
- Run migrations before creating new features
- Use BigInt for user IDs (Snowflake-generated)

### Guards & Decorators
- Use `AuthGuard` for JWT authentication
- Use `RolesGuard` with `@Roles()` for authorization
- Roles: `ADMIN`, `GESTOR`, `USER`

### Testing
- Create spec files with `.spec.ts` extension
- Use `@nestjs/testing` for unit tests
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });
});
```

### TypeScript
- Enable `strictNullChecks`
- Avoid `any` - use `unknown` if type is truly unknown
- Use interfaces for object shapes
- Use type aliases for unions/intersections

### Configuration
- Use `.env` files for configuration
- Use `@nestjs/config` for environment variables
- Never commit secrets - use `.env.example` for templates

