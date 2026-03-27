---
description: Criar documentaçao swagger de maneira automatica
agent: build
---
You are a senior backend engineer specializing in NestJS, Zod (`nestjs-zod`), and Swagger (OpenAPI).

## Goal

Safely snapshot the current project state, then incrementally improve API documentation using Zod `.describe()` and Swagger response decorators — with detailed, well-structured commits.

---

## Step 1 — SAFE SNAPSHOT COMMIT (DETAILED)

Before making ANY changes:

1. Stage all changes (including untracked files)

2. Analyze the diff and group changes by context (e.g., auth, users, infra, etc.)

3. Create a **detailed commit message**, NOT generic.

### Commit message rules:

* Must describe WHAT is being committed
* Must reference main modules/files affected
* Must be structured

### Example:

```bash
git add .
git commit -m "chore: snapshot before swagger improvements

- auth: guard, service and jwt strategy updates
- users: initial query implementation with pagination
- prisma: schema adjustments and migrations
- infra: docker and environment setup
"
```

🚨 DO NOT proceed until this commit is created.

---

## Step 2 — DTO IMPROVEMENTS (ZOD)

For EVERY DTO using Zod:

* Add `.describe()` to ALL fields
* Descriptions must be meaningful and helpful for frontend usage

### Example:

```ts
z.string().describe('User full name')
z.string().email().describe('User email address')
z.string().uuid().describe('Unique user identifier')
z.number().int().describe('Page number for pagination')
```

### Rules:

* Do NOT change validation logic
* Do NOT rename fields
* Only enhance documentation

---

## Step 3 — CONTROLLER DOCUMENTATION

For EVERY controller and route:

### DO NOT ADD:

* `@ApiTags`
* `@ApiBody`
* `@ApiQuery`
* `@ApiParam`

---

### ADD:

#### 1. Operation description

```ts
@ApiOperation({
  summary: 'Short summary',
  description: 'Clear explanation of what this endpoint does',
})
```

---

#### 2. Success responses

Use:

* `@ApiOkResponse`
* `@ApiCreatedResponse` (for POST)

Include:

* description
* realistic example (NOT generic)

---

#### 3. Error responses (when applicable)

* `@ApiBadRequestResponse`
* `@ApiUnauthorizedResponse`
* `@ApiNotFoundResponse`

Use consistent format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

---

#### 4. Prefer DTO usage

```ts
@ApiOkResponse({
  type: UserDto,
})
```

For arrays:

```ts
@ApiOkResponse({
  type: UserDto,
  isArray: true,
})
```

---

## Step 4 — COMMITS AFTER CHANGES (IMPORTANT)

After making changes:

### DO NOT create a single commit for everything.

Instead, create **multiple commits grouped by context**.

---

### Commit rules:

Each commit must:

* Be scoped (per module or feature)
* Clearly describe what was improved
* Mention Zod + Swagger when relevant

---

### Examples:

```bash
git add src/users/dto
git commit -m "docs(users): add Zod .describe() to user DTOs

- document id, name, email fields
- improve clarity for API consumers
"
```

```bash
git add src/users/user.controller.ts
git commit -m "docs(users): enhance swagger responses and operation descriptions

- add ApiOperation descriptions
- document success responses with examples
- add error response documentation
"
```

```bash
git add src/auth
git commit -m "docs(auth): improve authentication endpoint documentation

- add detailed operation descriptions
- document success and unauthorized responses
"
```

---

## Step 5 — GENERAL RULES

* Do NOT change business logic
* Do NOT introduce breaking changes
* Do NOT remove existing functionality
* Keep code clean and consistent
* Prefer English for all descriptions
* Avoid generic descriptions like "Get data"

---

## Expected Outcome

* All DTOs have `.describe()`
* Controllers have detailed Swagger documentation
* Responses include realistic examples
* Commits are well-structured and meaningful
* Project remains stable and functional

---

