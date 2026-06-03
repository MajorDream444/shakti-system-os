```markdown
# shakti-system-os Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `shakti-system-os` TypeScript codebase. You'll learn about file naming, import/export styles, commit message patterns, and how to write and run tests. This guide also suggests commands for common workflows to streamline your development process.

## Coding Conventions

### File Naming
- **PascalCase** is used for file names.
  - Example: `UserProfile.ts`, `SystemManager.ts`

### Import Style
- Both **default** and **named imports** are used.
  - Example (default import):
    ```typescript
    import UserProfile from './UserProfile';
    ```
  - Example (named import):
    ```typescript
    import { SystemManager } from './SystemManager';
    ```

### Export Style
- **Default exports** are preferred.
  - Example:
    ```typescript
    export default UserProfile;
    ```

### Commit Message Patterns
- Commit messages are generally freeform, sometimes prefixed with `deploy`.
- Average commit message length: 66 characters.
  - Example: `deploy: update UserProfile with new validation logic`

## Workflows

### Deployment
**Trigger:** When you are ready to deploy new changes to production or staging.
**Command:** `/deploy`

1. Ensure all code changes are committed with an appropriate message (optionally prefixed with `deploy`).
2. Run all tests to verify code integrity.
3. Push changes to the remote repository.
4. Initiate the deployment process (manual or via CI/CD, as applicable).

## Testing Patterns

- Test files follow the pattern: `*.test.*`
  - Example: `UserProfile.test.ts`
- The specific testing framework is unknown, but standard TypeScript test patterns apply.
- Example test file structure:
  ```typescript
  // UserProfile.test.ts
  import UserProfile from './UserProfile';

  describe('UserProfile', () => {
    it('should create a user profile', () => {
      const profile = new UserProfile('Alice');
      expect(profile.name).toBe('Alice');
    });
  });
  ```

## Commands
| Command   | Purpose                                 |
|-----------|-----------------------------------------|
| /deploy   | Deploy the latest changes               |
```
