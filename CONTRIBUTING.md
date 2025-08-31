# Contributing to Tracking

Thank you for your interest in contributing to Tracking! This document provides guidelines and instructions for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our standards of conduct. Be respectful, inclusive, and professional in all interactions.

## Branching Strategy

We use a Git Flow-inspired branching strategy:

- **`mainone`**: Production-ready code
- **`develop`**: Integration branch for features
- **Feature branches**: `feature/description` (e.g., `feature/user-authentication`)
- **Bugfix branches**: `fix/description` (e.g., `fix/login-validation`)
- **Chore branches**: `chore/description` (e.g., `chore/update-dependencies`)
- **Release branches**: `release/version` (e.g., `release/v1.2.0`)
- **Hotfix branches**: `hotfix/description` (e.g., `hotfix/security-patch`)

### Branch Naming Guidelines

- Use lowercase letters and hyphens
- Be descriptive but concise
- Include relevant issue number when applicable: `feature/123-add-dashboard`

## Conventional Commits

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools
- **ci**: Changes to CI configuration files and scripts

### Examples

```bash
feat(auth): add OAuth2 integration
fix(api): handle null response in user service
docs: update API documentation
test(components): add unit tests for UserCard
chore: update dependencies to latest versions
```

## Development Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/jeanmcdowell/tracking.git
   cd tracking
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow coding standards (see below)
   - Write tests for new functionality
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(component): add new tracking widget"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] New tests added for new functionality
- [ ] Documentation updated if needed
- [ ] No merge conflicts with target branch
- [ ] PR description clearly explains changes

### PR Title Format

Use conventional commit format for PR titles:
```
feat(scope): brief description of changes
```

### PR Description Template

Use the provided PR template to ensure all necessary information is included.

## Testing Instructions

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test src/components/UserCard.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="authentication"
```

### Test Requirements

- **Unit Tests**: All new functions and components must have unit tests
- **Integration Tests**: Complex features should include integration tests
- **Coverage**: Maintain minimum 80% code coverage
- **Test Naming**: Use descriptive test names that explain the scenario

### Writing Tests

```typescript
// Example test structure
describe('UserCard Component', () => {
  it('should render user information correctly', () => {
    // Test implementation
  });

  it('should handle click events properly', () => {
    // Test implementation
  });

  it('should display loading state when data is pending', () => {
    // Test implementation
  });
});
```

## Code Style Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Follow SOLID principles
- Use meaningful variable and function names
- Keep functions small and focused
- Comment complex logic

### TypeScript/JavaScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid `any` type; use proper typing
- Use modern ES6+ features
- Prefer functional programming patterns

### React Guidelines

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement proper error boundaries
- Optimize re-renders with useMemo/useCallback

### CSS/Styling

- Use CSS Modules or styled-components
- Follow BEM methodology for class naming
- Use semantic HTML
- Ensure responsive design
- Test accessibility

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components
│   └── specific/       # Feature-specific components
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── tests/              # Test utilities and setup
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserCard`, `NavigationMenu`)
- **Files**: kebab-case (e.g., `user-card.tsx`, `api-client.ts`)
- **Variables/Functions**: camelCase (e.g., `getUserData`, `isAuthenticated`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRY_ATTEMPTS`)

## Linting and Formatting

### Tools Used

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

### Commands

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

### Editor Configuration

Use the provided `.editorconfig` and configure your editor to:
- Use 2 spaces for indentation (4 for Python files)
- Use LF line endings
- Trim trailing whitespace
- Insert final newline

## Getting Help

- Check existing issues and discussions
- Ask questions in issue comments
- Join our community discussions
- Reach out to maintainers for guidance

## Recognition

All contributors will be acknowledged in our README and release notes. Thank you for helping make Tracking better!
