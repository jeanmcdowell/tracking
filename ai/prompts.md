# AI Prompts

This document contains curated prompt snippets for common development tasks in the tracking project. Copy and customize these prompts as needed for your AI interactions.

## Issue Triage

### Analyzing New Issues
```
Review this GitHub issue for the tracking energy monitoring project. Analyze:
1. Issue clarity and completeness
2. Appropriate labels (type: bug/feat/docs, priority, status)
3. Missing information that should be requested
4. Estimated complexity and effort
5. Related components or areas of code

[Paste issue content here]

Provide a triage summary with recommended labels and next steps.
```

### Issue Enhancement Suggestions
```
Help improve this issue description for better clarity:
1. Suggest missing details (environment, steps to reproduce, expected vs actual behavior)
2. Recommend appropriate acceptance criteria
3. Identify potential edge cases
4. Suggest related issues or dependencies

[Paste issue here]
```

## Writing Tests

### Unit Test Creation
```
Write comprehensive unit tests for this function in the tracking project:

File: [file path]
Function: [function name]
Description: [brief description]

Requirements:
- Use Vitest as the testing framework
- Follow existing test patterns in the codebase
- Cover edge cases and error conditions
- Include TypeScript types
- Aim for 100% code coverage
- Use descriptive test names

[Paste function code here]
```

### Integration Test Planning
```
Design integration tests for the energy tracking workflow:

Components to test: [list components]
User scenarios: [list key scenarios]
Data flow: [describe data flow]

Create a test plan covering:
1. Happy path scenarios
2. Error handling
3. Data validation
4. API interactions
5. Database operations

Use React Testing Library and follow existing patterns.
```

### Test Debugging
```
Help debug this failing test in the tracking project:

Error message: [paste error]
Test code: [paste test code]
Function being tested: [paste function code]

Analyze:
1. Root cause of the failure
2. Missing mocks or setup
3. Timing or async issues
4. Data structure mismatches
5. Suggested fix with explanation
```

## Code Refactoring

### Component Refactoring
```
Refactor this React component for the tracking project to improve:
1. TypeScript type safety
2. Performance (memoization, optimizations)
3. Readability and maintainability
4. Accessibility compliance
5. Test coverage

[Paste component code]

Follow our style guide:
- Use conventional commits
- Maintain ESLint compliance
- Add proper TypeScript interfaces
- Include JSDoc comments
```

### Utility Function Refactoring
```
Refactor this utility function for better:
1. Type safety and generics
2. Performance optimization
3. Error handling
4. Documentation
5. Reusability

Function: [paste function code]
Usage context: [describe how it's used]
Performance requirements: [any specific needs]

Ensure compatibility with existing callers.
```

## Pull Request Creation

### PR Description Generation
```
Generate a comprehensive pull request description for these changes in the tracking project:

Changes made: [describe changes]
Files modified: [list files]
Issue reference: [link to issue if applicable]

Include:
1. Clear title following conventional commits (feat|fix|docs|style|refactor|test|chore)
2. Problem description
3. Solution approach
4. Testing performed
5. Breaking changes (if any)
6. Screenshots (if UI changes)
7. Checklist for reviewers

Follow the existing PR template format.
```

### PR Self-Review Checklist
```
Perform a self-review of my PR for the tracking project:

PR link: [paste link]

Check:
1. Code follows style guidelines (ESLint, Prettier)
2. TypeScript types are complete and accurate
3. Tests cover new functionality
4. Documentation is updated
5. No console.logs or debug code
6. Performance implications considered
7. Accessibility requirements met
8. Breaking changes documented
9. Commit messages follow conventional format
10. CODEOWNERS approval paths clear
```

## Code Review

### Review Guidelines Prompt
```
Review this pull request for the tracking project following our standards:

PR: [paste PR link or description]
Code changes: [paste diff or key changes]

Focus on:
1. **Tests First**: Are comprehensive tests included?
2. **Type Safety**: TypeScript usage and type correctness
3. **Conventional Commits**: Proper commit message format
4. **Code Quality**: ESLint compliance, readability, maintainability
5. **Performance**: Any potential performance issues
6. **Security**: Input validation, secure practices
7. **Accessibility**: WCAG compliance for UI changes
8. **Documentation**: Code comments, README updates

Provide specific, actionable feedback with examples.
```

### Security Review
```
Perform a security review of this code change:

[Paste code]

Check for:
1. Input validation and sanitization
2. SQL injection prevention
3. XSS vulnerabilities
4. Authentication/authorization issues
5. Data exposure risks
6. Dependency vulnerabilities
7. Environment variable handling

This is for an energy tracking application handling usage data.
```

## Release Notes

### Release Notes Generation
```
Generate release notes for version [version] of the tracking project:

Commits since last release: [paste commit history]
Key features added: [list features]
Bugs fixed: [list fixes]
Breaking changes: [list any breaking changes]

Format as:
# Release v[version]

## 🚀 Features
## 🐛 Bug Fixes  
## 💥 Breaking Changes
## 📚 Documentation
## 🧹 Maintenance

Group related changes and use clear, user-focused language.
```

### Changelog Maintenance
```
Update the CHANGELOG.md for this release:

Version: [version]
Release date: [date]
Changes: [list of changes]

Follow Keep a Changelog format:
- Added for new features
- Changed for changes in existing functionality
- Deprecated for soon-to-be removed features
- Removed for now removed features
- Fixed for any bug fixes
- Security for security improvements
```

## Quick Commands

### Development Environment Setup
```
Help me set up the tracking project development environment:

1. Check my system requirements
2. Guide through installation steps
3. Explain key npm scripts
4. Help configure VS Code/editor
5. Run first-time setup validation

I'm using: [OS/environment details]
```

### Debugging Help
```
Help debug this issue in the tracking project:

Error: [paste error message]
Context: [what were you doing]
Environment: [development/production]
Browser/Node version: [version]

Recent changes: [any recent changes]
Steps to reproduce: [if known]

Provide debugging steps and potential solutions.
```

## Pro Tips

1. **Be Specific**: Include file paths, error messages, and context
2. **Provide Examples**: Show the current code and desired outcome  
3. **Mention Constraints**: Note any technical or business requirements
4. **Reference Standards**: Point to our style guide, conventions, and patterns
5. **Include Tests**: Always ask for tests when requesting new code
6. **Think Security**: Consider security implications in your prompts

Remember: These prompts are starting points. Customize them based on your specific needs and the context of your work.
