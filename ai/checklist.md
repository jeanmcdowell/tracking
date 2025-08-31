# First 10 Minutes Checklist

Get up and running with the tracking project quickly. Complete these steps in your first 10 minutes to ensure everything is working properly.

## ✅ Initial Setup (First Time Only)

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/jeanmcdowell/tracking.git
cd tracking

# Install dependencies
npm install
```

### 2. Environment Setup
```bash
# Copy environment template (if exists)
cp .env.example .env

# Verify Node.js version
node --version  # Should be 18.x or 20.x
```

## 🔍 Quality Checks (Every Session)

Run these checks every time you start working:

### 3. Type Check
```bash
npm run type-check
```
**✅ Expected**: No TypeScript errors
**❌ If failed**: Fix type errors before proceeding

### 4. Linting
```bash
npm run lint
```
**✅ Expected**: No ESLint errors or warnings
**❌ If failed**: Run `npm run lint:fix` or fix manually

### 5. Run Tests
```bash
npm test
```
**✅ Expected**: All tests pass, good coverage
**❌ If failed**: Investigate failing tests before making changes

## 🚀 Development Server

### 6. Start Development Server
```bash
npm run dev
```
**✅ Expected**: Server starts on localhost (usually :3000)
**❌ If failed**: Check port availability, dependencies

Alternatively, use watch mode:
```bash
npm run dev:watch
```

## 🔧 Verification Steps

- [ ] Repository cloned successfully
- [ ] Dependencies installed (`node_modules` exists)
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes (or can be auto-fixed)
- [ ] `npm test` passes
- [ ] `npm run dev` starts successfully
- [ ] Application loads in browser
- [ ] No console errors in browser dev tools

## 🏷️ Understanding CI Badges

The repository README shows CI status badges. Here's what they mean:

### CI Badge Status
- **🟢 Passing**: All checks pass (type-check, lint, tests)
- **🔴 Failing**: One or more checks failed
- **🟡 Pending**: CI is currently running
- **⚫ Unknown**: No recent CI runs or error

### What CI Checks
1. **TypeScript Compilation**: Code compiles without type errors
2. **ESLint**: Code follows style guidelines
3. **Tests**: All test suites pass with coverage requirements
4. **Multiple Node Versions**: Tests against Node.js 18.x and 20.x

## 🛠️ Common Commands Reference

### Development
```bash
npm run dev              # Start development server
npm run dev:watch        # Start with file watching
npm run build            # Production build
```

### Code Quality
```bash
npm run lint             # Check for style issues
npm run lint:fix         # Auto-fix style issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
```

### Testing
```bash
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

### Git & Commits
```bash
git status               # Check working directory status
git add .                # Stage all changes
git commit -m "feat: ..." # Commit with conventional format
git push                 # Push to remote
```

## 🚨 Troubleshooting

### Common Issues & Solutions

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
PORT=3001 npm run dev
```

**TypeScript errors after pulling:**
```bash
npm run type-check
# Fix any new type issues
```

**Tests failing after changes:**
```bash
npm test -- --verbose
# Review specific test failures
```

**Lint errors:**
```bash
npm run lint:fix    # Auto-fix what's possible
npm run lint        # Review remaining issues
```

## 📋 Pre-Commit Checklist

Before committing code, ensure:
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] Code builds successfully (`npm run build`)
- [ ] Commit message follows [conventional commits](https://www.conventionalcommits.org/)
- [ ] No console.log statements left in code
- [ ] Documentation updated if needed

## 🎯 Next Steps

Once you've completed this checklist:
1. Review the [AI Onboarding](./onboarding.md) guide
2. Browse [AI Prompts](./prompts.md) for development tasks
3. Check out the [project documentation](../docs/)
4. Look at open [issues](https://github.com/jeanmcdowell/tracking/issues) to contribute

## 💡 Pro Tips

- **VS Code**: Install recommended extensions (ESLint, Prettier, TypeScript)
- **Git Hooks**: Consider setting up pre-commit hooks for quality checks
- **Watch Mode**: Use `npm run test:watch` while developing
- **Hot Reload**: Development server auto-reloads on changes
- **Console**: Keep browser dev tools open to catch JavaScript errors
- **Documentation**: When in doubt, check existing code patterns

---

**Time Target**: Complete this checklist in under 10 minutes  
**Frequency**: Run quality checks (steps 3-5) every session  
**Questions?**: Check [AI Onboarding](./onboarding.md) or ask for help with specific [prompts](./prompts.md)
