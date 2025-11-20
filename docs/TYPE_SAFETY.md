# Type Safety Guidelines

This document describes the type safety practices enforced in this project.

## Zero `any` Policy

This project enforces a **strict zero `any` policy**. All types must be explicitly defined.

### ESLint Rules

The following TypeScript ESLint rules are enforced as **errors**:

```javascript
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/no-unsafe-assignment': 'error',
'@typescript-eslint/no-unsafe-member-access': 'error',
'@typescript-eslint/no-unsafe-call': 'error',
'@typescript-eslint/no-unsafe-return': 'error',
'@typescript-eslint/no-unsafe-argument': 'error',
```

These rules ensure that:

- No `any` type is used explicitly
- No unsafe operations are performed on values of unknown type
- All type assertions are checked at compile time

### Type Checking Configuration

ESLint is configured with type-aware linting:

```javascript
languageOptions: {
  parserOptions: {
    project: ['./tsconfig.app.json', './tsconfig.node.json'],
    tsconfigRootDir: import.meta.dirname,
  },
}
```

This enables ESLint to perform deep type analysis using TypeScript's type checker.

## Type Definitions

### API Types (`src/types/api.ts`)

All API-related types are defined based on the Swagger/OpenAPI specification:

- `Repository` - GitHub repository data
- `Resume` - User resume/CV data
- `Education` - Education entry
- `WorkExperience` - Work experience entry
- `LanguageSkill` - Language proficiency
- `ApiResponse<T>` - Generic API response wrapper
- `ApiError` - Error response structure

### Authentication Types (`src/types/auth.ts`)

Authentication-related types:

- `AuthTokens` - Access and refresh tokens
- `User` - User data
- `MeResponse` - `/me` endpoint response
- `RefreshTokenResponse` - Token refresh response

## Error Handling

### Type-Safe Error Handling

Instead of `catch (error: any)`, use `catch (error: unknown)` with type guards:

```typescript
import type { AxiosError } from 'axios';

import type { ApiError } from '../types/api';

function isAxiosError(error: unknown): error is AxiosError<ApiError> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    error.isAxiosError === true
  );
}

try {
  await api.get('/endpoint');
} catch (error: unknown) {
  if (isAxiosError(error)) {
    // Type-safe access to error.response, error.message, etc.
    console.error('API Error:', error.response?.data);
  } else {
    console.error('Unknown error:', error);
  }
}
```

### Axios Interceptors

Axios interceptors are properly typed:

```typescript
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // config is properly typed
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error as Error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
    }
    return Promise.reject(error as Error);
  },
);
```

## Function Return Types

### Explicit Return Types (Warning)

Functions should have explicit return types:

```typescript
// ✅ Good
async function fetchUser(): Promise<User> {
  const response = await api.get<MeResponse>('/me');
  return response.data.data.user;
}

// ⚠️ Warning (but allowed for simple expressions)
const bootstrap = (): void => {
  render(<App />);
};

// ❌ Bad (will trigger warning)
async function fetchUser() {
  const response = await api.get('/me');
  return response.data;
}
```

Exceptions:

- Arrow functions with simple expressions are allowed
- Type annotations on function expressions are sufficient

## Type Imports

Use `type` imports for type-only imports:

```typescript
// ✅ Good
import type { User } from './types/auth';
import type { AxiosError } from 'axios';

// ❌ Bad
import { User } from './types/auth';
import { AxiosError } from 'axios';
```

This is enforced by:

```javascript
'@typescript-eslint/consistent-type-imports': [
  'error',
  {
    prefer: 'type-imports',
    disallowTypeAnnotations: true,
  },
],
```

## Testing

### Relaxed Rules for Tests

Test files have some relaxed rules:

```javascript
{
  files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
}
```

This allows for more flexible mocking and test syntax while maintaining type safety for actual application code.

## Best Practices

### 1. Define Types First

Before implementing a feature, define all necessary types:

```typescript
// types.ts
export interface CreateUserRequest {
  email: string;
  username: string;
}

export interface CreateUserResponse {
  success: boolean;
  data: { user: User };
}

// service.ts
async function createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
  return await api.post('/users', data);
}
```

### 2. Use Generic Types

For reusable API patterns:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await api.get<ApiResponse<T>>(url);
  return response.data;
}
```

### 3. Avoid Type Assertions

Use type guards instead of `as` assertions:

```typescript
// ❌ Bad
function processError(error: unknown) {
  const axiosError = error as AxiosError;
  console.log(axiosError.response.data);
}

// ✅ Good
function processError(error: unknown) {
  if (isAxiosError(error)) {
    console.log(error.response?.data);
  }
}
```

### 4. Exhaustive Type Checking

Use discriminated unions and `never` for exhaustive checks:

```typescript
type WorkFormat = 'remote' | 'hybrid' | 'office';

function getWorkFormatLabel(format: WorkFormat): string {
  switch (format) {
    case 'remote':
      return 'Remote';
    case 'hybrid':
      return 'Hybrid';
    case 'office':
      return 'Office';
    default:
      const exhaustive: never = format;
      throw new Error(`Unhandled format: ${exhaustive}`);
  }
}
```

## Verification

To verify type safety:

```bash
# Check for any 'any' types in code
pnpm exec grep -r "any" src/ --include="*.ts" --include="*.tsx"

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Run all checks (including tests)
pnpm format && pnpm lint && pnpm typecheck && pnpm test:run
```

## Exceptions

There are **no exceptions** to the zero `any` policy. If you encounter a situation where you think `any` is necessary:

1. Create proper type definitions
2. Use `unknown` with type guards
3. Use generic types
4. Extract and properly type third-party library types

## Resources

- [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [ESLint TypeScript Rules](https://typescript-eslint.io/rules/)
- [Axios TypeScript Guide](https://axios-http.com/docs/typescript)
