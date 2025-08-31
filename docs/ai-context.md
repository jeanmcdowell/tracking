# AI Context Guide

This document provides context and guidance for AI assistants working on the Tracking project. It includes project goals, technical details, and best practices for AI-assisted development.

## Project Goals

### Primary Objectives
- **Energy Monitoring**: Track and analyze energy consumption patterns across different sources and time periods
- **Resource Optimization**: Identify opportunities to reduce waste and improve efficiency
- **Data Visualization**: Provide clear, actionable insights through intuitive dashboards and reports
- **User Engagement**: Enable users to understand and take control of their energy usage
- **Scalability**: Support multiple users, devices, and data sources

### Success Metrics
- User adoption and engagement rates
- Accuracy of energy consumption predictions
- Reduction in user energy costs
- System performance and reliability
- Developer productivity and code quality

## Domain Glossary

### Energy Terms
- **kWh (Kilowatt-hour)**: Unit of energy consumption
- **Peak Hours**: Time periods with highest energy demand and costs
- **Base Load**: Minimum continuous energy consumption
- **Load Shedding**: Temporary reduction of energy supply
- **Carbon Footprint**: Environmental impact of energy usage
- **Grid**: Electrical power distribution network

### Technical Terms
- **Sensor**: Device that collects energy usage data
- **Meter Reading**: Periodic measurement of energy consumption
- **Time Series**: Data points indexed by time
- **Aggregation**: Combining data across time periods or sources
- **Anomaly**: Unusual pattern in energy usage
- **Forecast**: Predicted future energy consumption

### Business Terms
- **Tariff**: Pricing structure for energy consumption
- **Billing Cycle**: Regular period for energy cost calculation
- **Demand Charge**: Fee based on peak usage
- **Net Metering**: Bidirectional energy flow measurement
- **Energy Audit**: Comprehensive analysis of usage patterns

## Tech Stack

### Backend
- **Runtime**: Node.js (LTS version)
- **Framework**: Express.js for REST API
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL with TimescaleDB extension for time-series data
- **ORM**: Prisma for database operations
- **Authentication**: JWT tokens with refresh mechanism
- **Validation**: Zod for schema validation
- **API Documentation**: OpenAPI/Swagger

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router for navigation
- **State Management**: Zustand for application state
- **UI Components**: Tailwind CSS with Headless UI
- **Charts**: Chart.js or D3.js for data visualization
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios for API communication

### Database
- **Primary DB**: PostgreSQL 14+
- **Time Series**: TimescaleDB extension for efficient time-series storage
- **Caching**: Redis for session storage and caching
- **Migrations**: Prisma migrate for schema management
- **Backup**: Automated daily backups with point-in-time recovery

### DevOps & Tools
- **Testing**: Jest for unit tests, React Testing Library for components
- **Linting**: ESLint with TypeScript and React rules
- **Formatting**: Prettier for consistent code style
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Docker**: Containerization for consistent environments
- **Environment**: Docker Compose for local development

## Key Entry Points

### Backend Entry Points
- `src/app.ts` - Main Express application setup
- `src/routes/` - API route definitions
  - `src/routes/auth.ts` - Authentication endpoints
  - `src/routes/energy.ts` - Energy data endpoints
  - `src/routes/users.ts` - User management endpoints
- `src/middleware/` - Express middleware functions
- `src/services/` - Business logic and external integrations
- `src/models/` - Database models and schemas
- `src/utils/` - Utility functions and helpers

### Frontend Entry Points
- `src/main.tsx` - React application entry point
- `src/App.tsx` - Root component with routing
- `src/pages/` - Page components
  - `src/pages/Dashboard.tsx` - Main dashboard view
  - `src/pages/Analytics.tsx` - Energy analytics page
  - `src/pages/Settings.tsx` - User settings page
- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/services/api.ts` - API client configuration
- `src/stores/` - Zustand state stores

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `prisma/schema.prisma` - Database schema
- `.env.example` - Environment variables template

## Quick Run Instructions

### Development Setup
```bash
# Clone the repository
git clone https://github.com/jeanmcdowell/tracking.git
cd tracking

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start PostgreSQL (via Docker)
docker-compose up -d postgres redis

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev          # Starts both frontend and backend
# OR run separately:
npm run dev:backend  # Backend only (port 3001)
npm run dev:frontend # Frontend only (port 3000)
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- energy.test.ts

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend
```

### Building
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

## Known Limitations

### Technical Limitations
- **Time Zone Handling**: Currently supports single time zone, multi-zone support planned
- **Real-time Updates**: WebSocket implementation pending, currently using polling
- **Mobile Responsive**: Basic responsive design, native mobile app not yet available
- **Offline Support**: No offline functionality, requires internet connection
- **Data Export**: Limited export formats, more options planned

### Performance Limitations
- **Large Datasets**: Performance may degrade with >1M data points per query
- **Concurrent Users**: Optimized for <100 concurrent users
- **File Uploads**: Maximum 10MB per file upload
- **API Rate Limiting**: 1000 requests per hour per user

### Business Limitations
- **Single Tenant**: Multi-tenant architecture not yet implemented
- **Payment Integration**: No billing system, all features currently free
- **Third-party Integrations**: Limited to basic smart meter APIs
- **Data Retention**: 2-year maximum data retention policy

## Non-Goals

### Explicit Non-Goals
- **Smart Home Control**: We track energy usage but don't control devices
- **Energy Trading**: No peer-to-peer energy trading marketplace
- **Hardware Manufacturing**: Software-only solution, no physical devices
- **Energy Generation**: Focus on consumption, not renewable energy production
- **Social Features**: No social networking or community features
- **Cryptocurrency**: No blockchain or crypto-related features

### Out of Scope
- **HVAC Control**: Integration with heating/cooling systems
- **Electric Vehicle Charging**: Specialized EV charging management
- **Industrial Applications**: Focused on residential and small business use
- **Real Estate Integration**: No property management features

## How to Ask AI for Help Effectively

### Best Practices for AI Assistance

#### 1. Provide Context
**Good**: "I'm working on the energy analytics dashboard in React. The chart component is not updating when the date range filter changes. Here's the current component code: [code]"

**Bad**: "My chart isn't working"

#### 2. Specify Tech Stack
**Good**: "Using TypeScript with Prisma, how do I write a query to get daily energy consumption grouped by hour for the last 30 days?"

**Bad**: "How do I query the database?"

#### 3. Include Error Messages
**Good**: "Getting TypeScript error 'Property 'usage' does not exist on type 'EnergyReading'' when trying to access usage data in components/EnergyChart.tsx line 45"

**Bad**: "There's a TypeScript error"

#### 4. Mention Constraints
**Good**: "Need to optimize this PostgreSQL query for TimescaleDB with large datasets (millions of rows). Current query times out after 30 seconds."

**Bad**: "Make this query faster"

### Example AI Prompts

#### Code Review
```
Please review this React component for the energy dashboard. 
Check for:
- Performance issues with large datasets
- Accessibility compliance
- TypeScript type safety
- Error handling
- Code organization following our patterns in src/components/

[Component code here]
```

#### Bug Investigation
```
I'm debugging an issue where energy readings are not saving to PostgreSQL.
Stack: Node.js + Express + Prisma + PostgreSQL
Error: [full error message]
Relevant code: [controller and model code]
Database schema: [Prisma schema]

What could be causing this and how should I fix it?
```

#### Feature Implementation
```
I need to implement real-time energy monitoring alerts.
Requirements:
- Notify users when usage exceeds threshold
- Support email and in-app notifications
- Configure different thresholds per device
- Integrate with existing auth system

Tech stack: Node.js backend, React frontend, PostgreSQL
Existing patterns: [describe current notification system if any]

How should I structure this feature?
```

#### Performance Optimization
```
The energy analytics page is slow when loading data for large date ranges.
Current approach: [describe current implementation]
Database: PostgreSQL with TimescaleDB
Typical data volume: [provide specifics]
Performance goal: <2 seconds for 1 month of hourly data

What optimization strategies should I implement?
```

#### Testing Guidance
```
I need to write tests for the energy consumption calculation service.
Testing framework: Jest
Code to test: [service code]
External dependencies: PostgreSQL, Redis cache
Test scenarios needed: [list specific scenarios]

Help me structure comprehensive tests with proper mocking.
```

### AI Communication Guidelines

#### Do:
- Reference specific files and line numbers
- Include relevant configuration (tsconfig.json, package.json snippets)
- Mention the user story or business requirement
- Ask for multiple solution approaches
- Request code examples with explanations

#### Don't:
- Ask for complete application rewrites
- Request production passwords or sensitive data
- Assume AI knows about custom internal APIs
- Skip error messages or stack traces
- Ask for outdated technology recommendations

### Useful Context to Share

#### When Working on Features
- Current user stories from GitHub issues
- Related existing components or services
- API endpoints being consumed
- Database schema for relevant tables
- Performance requirements

#### When Debugging
- Full error messages and stack traces
- Browser console errors (for frontend issues)
- Network requests/responses (for API issues)
- Database query logs (for backend issues)
- Steps to reproduce the issue

#### When Optimizing
- Current performance metrics
- Performance goals and constraints
- User load patterns
- Infrastructure limitations
- Monitoring and profiling data

By following these guidelines, you'll get more accurate, actionable, and contextually appropriate assistance from AI tools while working on the Tracking project.
