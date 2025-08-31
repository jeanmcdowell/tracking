# GitHub Labels Usage Guide

This document explains how to use the standardized labels defined in `.github/labels.yml` for consistent issue and pull request categorization.

## Label Categories

Our label system uses four main categories to provide comprehensive classification:

### Type Labels
Categorize the nature of the issue or pull request:

- **`type: bug`** - Something isn't working as expected
- **`type: feat`** - New feature or enhancement request
- **`type: chore`** - Maintenance tasks, dependencies, or tooling
- **`type: docs`** - Documentation improvements or updates
- **`type: test`** - Testing related changes or improvements
- **`type: ci`** - CI/CD pipeline changes or improvements

### Priority Labels
Indicate urgency and importance:

- **`priority: P0`** - Critical - immediate attention required
- **`priority: P1`** - High priority - should be addressed soon
- **`priority: P2`** - Medium priority - normal timeline
- **`priority: P3`** - Low priority - can be addressed when convenient

### Status Labels
Track the current state of issues/PRs:

- **`status: needs-triage`** - Needs initial review and categorization
- **`status: needs-info`** - Waiting for more information from reporter
- **`status: ready`** - Ready to be worked on

### Area Labels
Indicate which part of the codebase is affected:

- **`area: backend`** - Backend/server-side changes
- **`area: frontend`** - Frontend/client-side changes
- **`area: devops`** - DevOps, infrastructure, or deployment changes

## Usage Guidelines

### For Issues
1. **Always** apply at least one `type:` label
2. Apply a `priority:` label based on urgency
3. New issues automatically get `status: needs-triage`
4. Apply relevant `area:` labels if the issue affects specific parts of the codebase

### For Pull Requests
1. **Always** apply at least one `type:` label
2. Apply `area:` labels for affected parts of the codebase
3. Priority labels are typically not needed for PRs

## Label Import Instructions

**Important**: GitHub does not automatically import labels from `.github/labels.yml` by default.

### Option 1: Manual Import
1. Go to repository Settings > Issues > Labels
2. Manually create each label using the names, colors, and descriptions from `.github/labels.yml`

### Option 2: Use Label Sync Action (Recommended)
Add a GitHub Action to automatically sync labels:

```yaml
# .github/workflows/sync-labels.yml
name: Sync Labels
on:
  push:
    branches: [main]
    paths: ['.github/labels.yml']
  workflow_dispatch:

jobs:
  labels:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: crazy-max/ghaction-github-labeler@v5
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          yaml-file: .github/labels.yml
          skip-delete: false
          dry-run: false
```

### Option 3: Use CLI Tool
Use [github-label-sync](https://github.com/Financial-Times/github-label-sync):
```bash
npx github-label-sync --access-token $GITHUB_TOKEN owner/repo
```

## Examples

### Good Issue Labeling
- Bug report: `type: bug`, `priority: P1`, `area: frontend`, `status: needs-triage`
- Feature request: `type: feat`, `priority: P2`, `area: backend`, `status: ready`
- Documentation update: `type: docs`, `priority: P3`, `status: ready`

### Good PR Labeling
- Bug fix: `type: bug`, `area: frontend`
- New feature: `type: feat`, `area: backend`, `area: frontend`
- Dependency update: `type: chore`

## Benefits

- **Consistent categorization** across all issues and PRs
- **Better project management** with clear priorities and areas
- **Improved filtering** and searching capabilities
- **Enhanced automation** possibilities with standardized labels
- **Clearer communication** for contributors and maintainers
