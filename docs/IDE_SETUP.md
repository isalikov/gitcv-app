# IDE Setup Guide

This document describes how to configure your IDE to work correctly with the project's TypeScript import settings.

## Import File Extensions

The project is configured to **NOT** use file extensions (`.ts`, `.tsx`) in import statements.

### ❌ Incorrect:

```typescript
import { Landing } from './Landing.tsx';
import { api } from './api.ts';
```

### ✅ Correct:

```typescript
import { Landing } from './Landing';
import { api } from './api';
```

## TypeScript Configuration

The project uses the following TypeScript settings in `tsconfig.app.json`:

```json
{
  "allowImportingTsExtensions": false,
  "verbatimModuleSyntax": true,
  "moduleResolution": "bundler"
}
```

These settings ensure that:

- Import statements do not include file extensions
- Type imports are explicit
- Module resolution works correctly with Vite bundler

## IDE Configuration

### VS Code

The project includes `.vscode/settings.json` with the following key settings:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.preferences.importModuleSpecifierEnding": "minimal"
}
```

**Setup:**

1. VS Code will automatically use these settings when you open the project
2. Install recommended extensions from `.vscode/extensions.json`:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

**Manual Configuration (if needed):**

1. Open VS Code Settings (`Cmd+,` on Mac or `Ctrl+,` on Windows)
2. Search for "Import Module Specifier Ending"
3. Set to "minimal"

### WebStorm / IntelliJ IDEA

**Setup:**

1. Open Settings (`Cmd+,` on Mac or `Ctrl+Alt+S` on Windows)
2. Navigate to: **Editor → Code Style → TypeScript**
3. Go to the **Imports** tab
4. Set:
   - **File extension in import path**: `Never`
   - **Use paths relative to the project**: `Enabled`

**Alternative Settings Path:**

1. **Settings → Languages & Frameworks → TypeScript**
2. Under **Code Style**, click **Configure**
3. Go to **Imports** tab
4. Set file extension to `Never`

### Cursor / Windsurf

These editors are based on VS Code, so they use the same `.vscode/settings.json` configuration:

1. The settings will be automatically applied
2. No additional configuration needed

### Vim / Neovim with LSP

If using `tsserver` or `typescript-language-server`:

```lua
-- In your LSP config
lspconfig.tsserver.setup({
  preferences = {
    importModuleSpecifierEnding = "minimal",
    importModuleSpecifier = "relative",
  }
})
```

## Troubleshooting

### Issue: IDE still adds file extensions

**Solution:**

1. Restart your IDE completely
2. Clear TypeScript server cache:
   - **VS Code**: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
   - **WebStorm**: File → Invalidate Caches → Restart
3. Verify `tsconfig.app.json` has `allowImportingTsExtensions: false`
4. Check your IDE settings match the configuration above

### Issue: Existing imports with extensions

**Solution:**

1. Find all imports with extensions:
   ```bash
   grep -r "from '\./.*\.tsx\?'" src/
   ```
2. Remove the extensions manually or use find-replace:
   - Find: `from '\./(.*)\.tsx?'`
   - Replace: `from './$1'`

### Issue: Auto-import not working

**Solution:**

1. Ensure TypeScript version is up to date (check `package.json`)
2. Restart TypeScript server
3. Check that the file being imported is included in `tsconfig.app.json`

## Project Standards

All team members should:

1. Configure their IDE according to this guide
2. Not commit imports with file extensions
3. Use the provided ESLint and Prettier configurations
4. Enable format-on-save in their IDE

## Related Files

- **TypeScript Config**: `tsconfig.app.json`
- **VS Code Settings**: `.vscode/settings.json`
- **ESLint Config**: `.eslintrc.cjs` (or similar)
- **Prettier Config**: `.prettierrc` (or similar)
