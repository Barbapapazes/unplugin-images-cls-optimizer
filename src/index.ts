import type { UnpluginFactory } from 'unplugin'
import type { ResolvedConfig } from 'vite'
import type { Options } from './types.js'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getPixels } from '@unpic/pixels'
import { blurhashToDataUri } from '@unpic/placeholder'
import { encode } from 'blurhash'
import MagicString from 'magic-string'
import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options.js'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (userOptions = {}) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const options = resolveOptions(userOptions)

  let resolvedConfig: ResolvedConfig

  const imgTagRegex = /<img\s[^>]*src=["']([^"']+)["'][^>]*>/g

  return {
    name: 'unplugin-images-cls-optimizer',
    enforce: 'pre',
    transform: {
      filter: {
        id: /\.(vue)$/,
        code: imgTagRegex,
      },
      async handler(code) {
        const s = new MagicString(code)

        let match = imgTagRegex.exec(code)

        if (!match) {
          return {
            code,
            map: null,
          }
        }

        do {
          const srcValue = match[1]

          // @unpic/pixels only supports png and jpg/jpeg
          // @see https://github.com/ascorbic/get-pixels
          if (!/\.png|jpe?g$/.test(srcValue)) {
            match = imgTagRegex.exec(code)
            continue
          }

          const img = await readFile(join(resolvedConfig.publicDir, srcValue))
          const data = await getPixels(img)
          const blurhash = encode(Uint8ClampedArray.from(data.data), data.width, data.height, 4, 4)

          const imgTagStart = match.index
          const imgTagEnd = imgTagStart + match[0].length

          const newImgTag = match[0].replace(
            /<img(\s+)/,
            `<img$1width="${data.width}" height="${data.height}" style="background-size: cover; background-image: url(${blurhashToDataUri(blurhash)});" loading="lazy" `,
          )

          s.overwrite(imgTagStart, imgTagEnd, newImgTag)

          match = imgTagRegex.exec(code)
        } while (match !== null)

        return {
          code: s.toString(),
          map: s.generateMap({ hires: true }),
        }
      },
    },
    vite: {
      configResolved(config) {
        resolvedConfig = config
      },
    },
  }
}

export default /* #__PURE__ */ createUnplugin(unpluginFactory)
