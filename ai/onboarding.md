# AI Onboarding

Welcome to the tracking project! This guide will help you get started and understand how to work effectively with AI assistance on this project.

## Quick Start

### Essential Documentation
- **[README](../README.md)** - Project overview and quickstart
- **[AI Context](../docs/ai-context.md)** - Technical context for AI assistance
- **[Contributing Guidelines](../CONTRIBUTING.md)** - Code standards and workflow
- **[AI Prompts](./prompts.md)** - Curated prompts for common tasks
- **[First 10 Minutes Checklist](./checklist.md)** - Get up and running quickly

### Key Scripts & Commands
```bash
# Development
npm run dev              # Start development server
npm run dev:watch        # Start with file watching

# Quality Checks
npm run lint             # Check code style
npm run type-check       # TypeScript validation
npm test                 # Run test suite
npm run test:watch       # Run tests in watch mode

# Build & Deploy
npm run build            # Production build
npm run format           # Format code
```

### Automated Workflows
This repository includes several automated workflows:
- **Auto-triage** - New issues get `status: needs-triage` label
- **Dependabot** - Automated dependency updates with smart auto-merge
- **CI Pipeline** - Type checking, linting, and testing on every PR
- **Label Sync** - Keeps repository labels consistent
- **CodeQL** - Security scanning and vulnerability detection

## How to Ask AI for Help

### General Guidelines
1. **Be Specific** - Include relevant file paths, error messages, or code snippets
2. **Provide Context** - Mention what you're trying to accomplish
3. **Reference Standards** - Our code follows conventional commits, ESLint rules, and TypeScript strict mode
4. **Include Test Requirements** - We maintain high test coverage

### Example Requests
```
✅ Good: "Help me write a test for the energy tracking utility in src/utils/energy.ts. It should test the calculateEfficiency function with various input scenarios."

❌ Less helpful: "Write a test"
```

### Code Review Integration
AI assistants should follow our [Copilot Instructions](../.github/copilot-instructions.md) for:
- Preferring comprehensive tests
- Following conventional commit format
- Maintaining lint and type-check compliance
- Respecting CODEOWNERS policies

## Next Steps
1. Review the [checklist](./checklist.md) for your first 10 minutes
2. Browse [common prompts](./prompts.md) for development tasks
3. Check out the [AI context document](../docs/ai-context.md) for technical details
4. Start contributing following our [guidelines](../CONTRIBUTING.md)

Happy coding! 🚀
