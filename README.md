# unplugin-images-cls-optimizer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![pkg.pr.new](https://pkg.pr.new/badge/Barbapapazes/unplugin-images-cls-optimizer)](https://pkg.pr.new/~/Barbapapazes/unplugin-images-cls-optimizer)

Erase CLS by automatically optimizing images.

- ⚡️ **Automatic Dimensions**: Automatically calculates and injects `width` and `height` attributes to prevent layout shifts.
- 🖼️ **Blurhash Placeholders**: Generates and injects a blurhash background for a smooth loading experience.
- 💤 **Lazy Loading**: Automatically adds `loading="lazy"` to images.
- 💚 **Vue Support**: Currently optimized for Vue applications. **But I'm sure it could be adapted for other frameworks as well.** Feel free to open an issue or a PR to suggest support for other frameworks.

Based on the article [Erase CLS by automatically optimizing images with Vite](https://soubiran.dev/posts/erase-cls-by-automatically-optimizing-images-with-vite).

## Installation

```bash
pnpm add -D unplugin-images-cls-optimizer
```

## Usage

> [!NOTE]
> Contributions, through issues or pull requests, to extend support for other frameworks are welcome!

### Vite

```ts
// vite.config.ts
import imagesClsOptimizer from 'unplugin-images-cls-optimizer/vite'

export default defineConfig({
  plugins: [
    imagesClsOptimizer(),
  ],
})
```

## How it works

This plugin scans your `.vue` files for `<img>` tags. When it finds a local image (PNG or JPG/JPEG), it:

1.  Reads the image file from your public directory.
2.  Calculates the image dimensions using `@unpic/pixels`.
3.  Generates a blurhash of the image.
4.  Rewrites the `<img>` tag with:
    - `width` and `height` attributes.
    - A `style` attribute containing the blurhash as a background image.
    - `loading="lazy"`.

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/barbapapazes">
    <img src='https://cdn.jsdelivr.net/gh/barbapapazes/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2025-PRESENT [Estéban Soubiran](https://github.com/barbapapazes)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/unplugin-images-cls-optimizer/latest.svg?style=flat&colorA=000&colorB=171717
[npm-version-href]: https://npmjs.com/package/unplugin-images-cls-optimizer

[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-images-cls-optimizer.svg?style=flat&colorA=000&colorB=171717
[npm-downloads-href]: https://npmjs.com/package/unplugin-images-cls-optimizer

[license-src]: https://img.shields.io/npm/l/unplugin-images-cls-optimizer.svg?style=flat&colorA=000&colorB=171717
[license-href]: https://npmjs.com/package/unplugin-images-cls-optimizer
