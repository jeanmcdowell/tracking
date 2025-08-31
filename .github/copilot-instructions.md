# Copilot Instructions for AI Code Reviews

This document provides guidelines for AI-powered code reviews and assistance in the tracking project. These instructions help ensure consistent, high-quality code contributions.

## 🎯 Primary Focus Areas

### 1. Tests First Philosophy
- **Prioritize comprehensive test coverage** for all new functionality
- Suggest missing test cases and edge case scenarios
- Recommend test-driven development (TDD) approach when appropriate
- Ensure tests are maintainable, readable, and follow existing patterns
- Verify that tests actually validate the intended behavior

**Example feedback:**
```
❗ Missing tests for the new calculateEfficiency function. Please add unit tests covering:
- Normal usage with valid input
- Edge case with zero values
- Error handling for negative inputs
- Boundary conditions
```

### 2. Conventional Commits Compliance
- **Enforce conventional commit message format**: `type(scope): description`
- Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`
- Require breaking changes to be clearly marked with `!` or `BREAKING CHANGE:`
- Ensure commit messages are descriptive and explain the "why" not just the "what"

**Example feedback:**
```
📋 Commit message should follow conventional format:
❌ "Update utils"
✅ "feat(utils): add energy efficiency calculation utility"
```

### 3. Lint and Type-Check Compliance
- **Ensure all code passes ESLint without warnings or errors**
- **Maintain strict TypeScript compliance** - no `any` types unless justified
- Suggest proper TypeScript interfaces and type annotations
- Recommend fixing linting issues before review completion
- Encourage use of `npm run lint:fix` for auto-fixable issues

**Example feedback:**
```
🔴 Please run `npm run lint:fix` and address remaining ESLint warnings:
- Remove unused imports
- Add explicit return types for exported functions
- Replace `any` type with proper interface
```

### 4. CODEOWNERS Respect
- **Acknowledge when changes require specific team member review**
- Reference CODEOWNERS file for path-specific ownership
- Suggest tagging appropriate owners for sensitive areas
- Respect architectural decisions and existing patterns

**Example feedback:**
```
📝 This change affects `.github/workflows/` which requires @jeanmcdowell review per CODEOWNERS.
Consider discussing the approach before implementation.
```

## 📝 Code Review Guidelines

### Code Quality Standards
- **Readability**: Code should be self-documenting with clear naming
- **Maintainability**: Follow DRY principles and existing patterns
- **Performance**: Consider efficiency implications, especially for energy tracking features
- **Security**: Review for potential vulnerabilities (XSS, injection, etc.)
- **Accessibility**: Ensure UI changes meet WCAG guidelines

### Documentation Requirements
- Update README.md for new features or significant changes
- Add JSDoc comments for exported functions and classes
- Update relevant documentation in the `docs/` folder
- Include examples in documentation where helpful

### Architecture Alignment
- Follow established project structure (`src/components/`, `src/utils/`, etc.)
- Maintain separation of concerns
- Use existing utilities and patterns before creating new ones
- Consider impact on bundle size and performance

## ⚙️ Technical Standards

### TypeScript Best Practices
```typescript
// ✅ Good: Explicit types and interfaces
interface EnergyReading {
  timestamp: Date;
  value: number;
  unit: 'kwh' | 'watts';
}

export function calculateEfficiency(readings: EnergyReading[]): number {
  // Implementation with proper error handling
}

// ❌ Avoid: Any types and implicit returns
function process(data: any) {
  // Implementation
}
```

### Testing Standards
```typescript
// ✅ Good: Descriptive test names and comprehensive coverage
describe('calculateEfficiency', () => {
  it('should return correct efficiency ratio for valid readings', () => {
    const readings = [{ timestamp: new Date(), value: 100, unit: 'kwh' }];
    const result = calculateEfficiency(readings);
    expect(result).toBeCloseTo(0.85, 2);
  });
  
  it('should throw error for empty readings array', () => {
    expect(() => calculateEfficiency([])).toThrow('No readings provided');
  });
});
```

### React Component Standards
```typescript
// ✅ Good: Proper typing and patterns
interface EnergyDisplayProps {
  reading: EnergyReading;
  onUpdate?: (reading: EnergyReading) => void;
}

export const EnergyDisplay: React.FC<EnergyDisplayProps> = ({ reading, onUpdate }) => {
  // Implementation with proper hooks and error boundaries
};
```

## 🚀 Review Process

### Pre-Review Checklist
Before providing review feedback, verify:
- [ ] CI pipeline status (should be passing)
- [ ] Code coverage hasn't decreased significantly
- [ ] Breaking changes are properly documented
- [ ] Commit messages follow conventional format
- [ ] Tests exist for new functionality

### Feedback Tone and Style
- **Be constructive and educational** - explain the "why" behind suggestions
- **Use specific examples** rather than vague recommendations
- **Acknowledge good practices** when seen
- **Suggest alternatives** rather than just pointing out problems
- **Link to documentation** or examples when relevant

### Priority Levels
- **🔴 Blocking**: Must be fixed before merge (security, breaking changes, test failures)
- **🟡 High**: Should be addressed (maintainability, best practices)
- **🟢 Low**: Nice to have (minor optimizations, style preferences)
- **📝 Note**: Informational (learning opportunities, future considerations)

## 📚 Resources

### Project-Specific Links
- [AI Onboarding](../ai/onboarding.md) - Project overview and setup
- [AI Prompts](../ai/prompts.md) - Common development prompts
- [First 10 Minutes Checklist](../ai/checklist.md) - Quick setup guide
- [Contributing Guidelines](../CONTRIBUTING.md) - Detailed contribution process

### External References
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript best practices
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing patterns
- [ESLint Rules](https://eslint.org/docs/rules/) - Linting standards

## 🧪 Example Review Comments

### Good Examples
```markdown
🔴 **Blocking**: This function doesn't handle the case where `readings` is empty, which could cause runtime errors. Consider adding validation:

```typescript
if (!readings || readings.length === 0) {
  throw new Error('No readings provided');
}
```

🟡 **High**: Great implementation! Consider extracting the efficiency calculation logic into a separate utility function to improve testability and reusability.

📝 **Note**: The new energy tracking feature looks solid. For future iterations, consider adding real-time updates using WebSockets.
```

### What to Avoid
```markdown
❌ "This is wrong"
❌ "Bad code"
❌ "Fix this"
❌ "Use better variable names"
```

## ✨ Remember

- **Quality over speed** - thorough review prevents technical debt
- **Tests are not optional** - they're part of the feature
- **Consistency matters** - follow established patterns
- **Security first** - especially for energy data handling
- **Document your reasoning** - help others learn

By following these guidelines, AI-powered reviews will help maintain high code quality while fostering a collaborative and educational development environment.
