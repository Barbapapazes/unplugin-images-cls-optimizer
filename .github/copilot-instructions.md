# Unplugin Images CLS Optimizer - Copilot Instructions

## Project Overview
This project is an **Unplugin** (Universal Plugin) designed to eliminate Cumulative Layout Shift (CLS) in web applications by automatically optimizing images. It currently targets **Vue** applications.

## Architecture & Core Components
- **Entry Point**: `src/index.ts` contains the `unpluginFactory` and the main transformation logic.
- **Options**: `src/core/options.ts` handles user configuration (currently minimal).
- **Types**: `src/types.ts` defines `Options` and `ResolvedOptions`.
- **Build System**: Uses `tsdown` for bundling (configured in `tsdown.config.ts`).

## Key Implementation Patterns

### 1. Unplugin Structure
The project follows the standard `unplugin` factory pattern:
```typescript
export const unpluginFactory: UnpluginFactory<Options | undefined> = (userOptions = {}) => {
  // ...
  return {
    name: 'unplugin-images-cls-optimizer',
    enforce: 'pre',
    transform: {
      // ...
    }
  }
}
```

### 2. Image Transformation Logic
- **Target**: Currently filters for `.vue` files (`filter: { id: /\.(vue)$/ }`).
- **Parsing**: Uses Regex (`/<img\s[^>]*src=["']([^"']+)["'][^>]*>/g`) to find `<img>` tags.
- **Manipulation**: Uses `magic-string` to overwrite the original `<img>` tag with an optimized version.
- **Optimization**:
  - Reads the image file from the Vite `publicDir`.
  - Calculates dimensions using `@unpic/pixels`.
  - Generates a blurhash using `blurhash` and `@unpic/placeholder`.
  - Injects `width`, `height`, `loading="lazy"`, and a `style` attribute with the blurhash background.

### 3. File System Access
- Relies on `resolvedConfig.publicDir` from Vite's config to locate image files.
- Uses `node:fs/promises` for file reading.

## Development Workflows

### Build & Lint
- **Build**: `pnpm build` (runs `tsdown`).
- **Lint**: `pnpm lint` (runs `eslint`).
- **Package Manager**: `pnpm`.

### Dependencies
- **Core**: `unplugin`, `magic-string`.
- **Image Processing**: `@unpic/pixels`, `@unpic/placeholder`, `blurhash`.

## Coding Conventions
- **TypeScript**: Strict typing.
- **Imports**: Use `node:` prefix for built-in modules (e.g., `node:fs/promises`).
- **Async/Await**: Prefer async/await over callbacks.
- **MagicString**: Always use `MagicString` for code transformations to generate accurate source maps.

## Critical Considerations
- **Regex Parsing**: The current HTML parsing is Regex-based. Be cautious of edge cases in HTML attributes.
- **Supported Formats**: The logic explicitly checks for `/\.png|jpe?g$/`.
- **Vite Integration**: The plugin currently relies on Vite-specific hooks (`configResolved`) to get the public directory.
