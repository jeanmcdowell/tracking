# Repository Structure

This document provides an overview of the repository structure and explains the purpose of each top-level directory and file.

## Current Repository Tree

```
tracking/
├── .github/                     # GitHub configuration and automation
│   ├── ISSUE_TEMPLATE/          # Issue templates for bug reports and feature requests
│   │   ├── bug_report.md        # Template for reporting bugs
│   │   └── feature_request.md   # Template for requesting features
│   ├── workflows/               # GitHub Actions CI/CD workflows
│   ├── CODEOWNERS              # Code ownership and review assignments
│   └── pull_request_template.md # Template for pull requests
├── docs/                        # Project documentation
│   ├── structure.md             # This file - repository structure overview
│   └── ai-context.md           # AI-specific context and guidance
├── src/                         # Source code (planned)
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   ├── services/               # API services and data fetching
│   ├── utils/                  # Utility functions and helpers
│   └── types/                  # TypeScript type definitions
├── tests/                       # Test files (planned)
├── public/                      # Static assets (planned)
├── .editorconfig               # Editor configuration for consistent formatting
├── .gitattributes              # Git attributes for file handling
├── .gitignore                  # Git ignore patterns
├── .env.example                # Environment variables template
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT license
├── README.md                   # Project overview and quickstart
├── package.json                # Node.js dependencies and scripts (planned)
└── tsconfig.json               # TypeScript configuration (planned)
```

## Directory and File Explanations

### `.github/`
Contains GitHub-specific configuration files and automation:
- **ISSUE_TEMPLATE/**: Standardized templates for creating issues
- **workflows/**: GitHub Actions for CI/CD, testing, and deployment
- **CODEOWNERS**: Defines code ownership for automatic review assignments
- **pull_request_template.md**: Template to guide PR creation

### `docs/`
Project documentation and guides:
- **structure.md**: This file, explaining repository organization
- **ai-context.md**: AI-specific context, guidelines, and examples

### `src/` (Planned)
Main application source code:
- **components/**: Reusable React components
- **hooks/**: Custom React hooks for shared logic
- **services/**: API services, data fetching, and external integrations
- **utils/**: Utility functions, helpers, and common logic
- **types/**: TypeScript type definitions and interfaces

### `tests/` (Planned)
Test files and testing utilities:
- Unit tests, integration tests, and test utilities
- Follows the same structure as `src/` for easy navigation

### `public/` (Planned)
Static assets served directly:
- Images, icons, fonts, and other static resources
- HTML template files

### Configuration Files

#### `.editorconfig`
Ensures consistent code formatting across different editors and IDEs:
- Sets indentation, line endings, and character encoding
- Supports multiple file types (JS, TS, HTML, CSS, JSON, YAML)

#### `.gitattributes`
Defines how Git handles different file types:
- Marks generated files (dist/, build/, coverage/) as linguist-generated
- Ensures consistent line endings (LF) across platforms

#### `.gitignore`
Specifies files and directories to exclude from version control:
- Node.js dependencies and build artifacts
- Environment variables and sensitive data
- Editor and OS-generated files
- Logs and temporary files

#### `.env.example`
Template for environment variables:
- Provides examples of required environment variables
- Safe to commit (contains no sensitive data)
- Developers copy to `.env` and fill in actual values

### Documentation Files

#### `CONTRIBUTING.md`
Guidelines for contributors:
- Development workflow and branching strategy
- Code style and formatting standards
- Pull request and review process
- Testing requirements

#### `LICENSE`
MIT License granting usage rights:
- Permissive open-source license
- Allows commercial and private use
- Requires attribution

#### `README.md`
Project overview and quickstart guide:
- Project description and goals
- Installation and setup instructions
- Basic usage examples
- Links to additional documentation

### Package Configuration (Planned)

#### `package.json`
Node.js project configuration:
- Dependencies and devDependencies
- Scripts for development, building, and testing
- Project metadata and configuration

#### `tsconfig.json`
TypeScript compiler configuration:
- Compilation options and type checking settings
- Path mapping and module resolution
- Target ES version and output settings

## Development Workflow

This structure supports a modern development workflow:

1. **Source Organization**: Clear separation of concerns with dedicated folders
2. **Testing**: Co-located tests with source code for easy maintenance
3. **Documentation**: Comprehensive docs for developers and AI assistants
4. **Automation**: GitHub Actions for CI/CD and quality assurance
5. **Standards**: Consistent formatting and coding standards
6. **Collaboration**: Templates and guidelines for contributors

## Future Additions

As the project grows, consider adding:
- `e2e/` - End-to-end tests
- `scripts/` - Build and deployment scripts
- `config/` - Configuration files for different environments
- `assets/` - Source assets (before optimization)
- `migrations/` - Database migrations (if applicable)
