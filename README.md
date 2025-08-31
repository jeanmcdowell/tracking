# Tracking

[![CI](https://github.com/jeanmcdowell/tracking/actions/workflows/ci.yml/badge.svg)](https://github.com/jeanmcdowell/tracking/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

A comprehensive energy and resource tracking application for monitoring usage patterns and optimizing efficiency.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: React, TypeScript
- **Testing**: Vitest, React Testing Library
- **Build Tools**: Vite
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions

## Scripts

This project includes several npm scripts for development and maintenance:

- `npm run lint` - Lint code using ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run type-check` - Check TypeScript types without emitting files
- `npm test` - Run tests with coverage using Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run format` - Format code using Prettier
- `npm run build` - Build the application for production
- `npm run dev` - Start development server

## Quickstart

### Install

```bash
# Clone the repository
git clone https://github.com/jeanmcdowell/tracking.git
cd tracking

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run in watch mode
npm run dev:watch
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## CI Status

This project uses GitHub Actions for continuous integration. The CI pipeline runs on every push and pull request to ensure code quality and test coverage.

- **Type checking**: Validates TypeScript types
- **Linting**: Ensures code follows style guidelines
- **Testing**: Runs comprehensive test suite with coverage
- **Multiple Node.js versions**: Tests against Node.js 18.x and 20.x

## Project Structure

```
tracking/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript definitions
├── tests/              # Test files
├── docs/               # Documentation
├── .github/            # GitHub workflows and templates
└── public/             # Static assets
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Documentation](docs)
- [Issues](https://github.com/jeanmcdowell/tracking/issues)
- [Pull Requests](https://github.com/jeanmcdowell/tracking/pulls)
- [Project Board](https://github.com/jeanmcdowell/tracking/projects)
