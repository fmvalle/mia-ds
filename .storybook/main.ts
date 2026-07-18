import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Storybook does not reliably expose STORYBOOK_* to process.env inside main.ts,
 * and the manager bundle has no import.meta.env. Read the .env files directly so
 * we can bridge config into the manager via window.__MIA_DS_CONFIG__.
 */
function readDsEnv(): Record<string, string> {
  const result: Record<string, string> = {}
  const files = ['.env', '.env.local']
  for (const file of files) {
    const full = path.resolve(dirname, '..', file)
    if (!fs.existsSync(full)) continue
    for (const rawLine of fs.readFileSync(full, 'utf8').split('\n')) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq === -1) continue
      const key = line.slice(0, eq).trim()
      const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      result[key] = value
    }
  }
  return { ...result, ...process.env } as Record<string, string>
}

const dsEnv = readDsEnv()

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  managerHead: (head) => {
    // Runs in Node at build time — Storybook loads .env and exposes STORYBOOK_*.
    // The manager bundle has no import.meta.env, so we bridge config via window.
    const config = {
      apiBaseUrl: dsEnv.STORYBOOK_API_BASE_URL || 'http://localhost:8000/api/v1',
      disableAuth:
        dsEnv.STORYBOOK_DISABLE_AUTH === 'true' || dsEnv.STORYBOOK_DISABLE_AUTH === '1',
    }
    return `
    ${head}
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <script>window.__MIA_DS_CONFIG__ = ${JSON.stringify(config)};</script>
  `
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      envPrefix: ['VITE_', 'STORYBOOK_'],
      resolve: {
        alias: {
          '@': path.resolve(dirname, '../src'),
        },
      },
    })
  },
}

export default config
