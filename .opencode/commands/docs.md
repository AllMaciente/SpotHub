---
description: Criar documentaçao swagger de maneira automatica
agent: build
---
---

description: Criar documentaçao swagger de maneira automatica
agent: build
------------

You are a senior backend engineer specializing in NestJS, Zod (`nestjs-zod`), and Swagger (OpenAPI).

## Goal

Safely snapshot the current project state, then incrementally improve API documentation using Zod `.describe()` and Swagger response decorators.

This command MUST be idempotent:

* It can be executed multiple times
* It must NOT duplicate or overwrite good existing documentation
* It must ONLY improve what is missing or weak

---

## Step 1 — SAFE SNAPSHOT COMMIT (DETAILED)

Before making ANY changes:

1. Stage all changes (including untracked files)
2. Analyze the diff and group changes by context
3. Create a detailed, structured commit message

🚨 DO NOT proceed until this commit is created.

---

## Step 2 — DTO IMPROVEMENTS (ZOD)

For EVERY DTO using Zod:

### Behavior rules (IDEMPOTENT):

* If a field already has `.describe()` → KEEP IT
* If description is weak or generic → IMPROVE IT
* If missing → ADD `.describe()`

### Example:

```ts
z.string().describe('User full name')
z.string().email().describe('User email address')
```

### Rules:

* Do NOT change validation logic
* Do NOT rename fields
* Do NOT remove existing descriptions unless replacing with a better one

---

## Step 3 — CONTROLLER DOCUMENTATION (BASED ON REAL CODE)

For EVERY controller and route:

---

### 🚨 CRITICAL RULE — REAL DATA ONLY

Before documenting:

* Inspect controller
* Inspect service methods
* Inspect Prisma queries (select/include)
* Inspect DTOs

❌ DO NOT assume responses
❌ DO NOT invent fields
❌ DO NOT use generic examples

---

### IDEMPOTENT RULES

* If `@ApiOperation` already exists:

  * Improve it ONLY if it's vague
* If response decorators already exist:

  * KEEP them if correct
  * IMPROVE examples/descriptions if weak
  * ADD only if missing

---

### DO NOT ADD:

* `@ApiTags`
* `@ApiBody`
* `@ApiQuery`
* `@ApiParam`

---

### ADD OR IMPROVE:

#### 1. Operation description

```ts
@ApiOperation({
  summary: 'Clear and concise summary',
  description: 'Accurate explanation based on real behavior',
})
```

---

#### 2. Success responses

Use:

* `@ApiOkResponse`
* `@ApiCreatedResponse`

Rules:

* Prefer DTO (`type`)
* Use `isArray` when needed
* Add REAL examples based on actual return

---

#### 3. Error responses

Add ONLY if they exist in code:

* `@ApiBadRequestResponse`
* `@ApiUnauthorizedResponse`
* `@ApiNotFoundResponse`

---

## Step 4 — NO FINAL COMMITS

🚨 IMPORTANT:

* DO NOT create commits after documentation changes
* DO NOT auto-stage files
* Leave all changes unstaged for manual review

---

## Step 5 — GENERAL RULES

* Do NOT change business logic
* Do NOT introduce breaking changes
* Do NOT remove valid existing documentation
* Prefer English
* Avoid generic descriptions

---

## Step 6 — QUALITY CHECK (VERY IMPORTANT)

Before finishing:

* Ensure no duplicate decorators were added
* Ensure no conflicting decorators exist
* Ensure formatting is clean
* Ensure consistency across files

---

## Expected Outcome

* Missing documentation is added
* Weak documentation is improved
* Good documentation is preserved
* No duplication
* No assumptions
* Safe to run multiple times

---

