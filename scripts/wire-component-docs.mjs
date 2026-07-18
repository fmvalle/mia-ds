#!/usr/bin/env node
/**
 * Wires ComponentDocsPage into every component/pattern story meta.
 * Run: node scripts/wire-component-docs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcRoot = path.join(root, 'src')

const SPECIAL_IDS = {
  FAB: 'fab',
  Charts: 'charts',
  Dashboard: 'dashboard',
  Table: 'table',
}

function toDocId(pascalName) {
  if (SPECIAL_IDS[pascalName]) return SPECIAL_IDS[pascalName]
  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.name.endsWith('.stories.tsx')) out.push(full)
  }
  return out
}

const skip = new Set([
  path.join(srcRoot, 'docs/Introduction.stories.tsx'),
  path.join(srcRoot, 'docs/Colors.stories.tsx'),
  path.join(srcRoot, 'docs/Spacing.stories.tsx'),
  path.join(srcRoot, 'docs/Typography.stories.tsx'),
  path.join(srcRoot, 'docs/I18n.stories.tsx'),
])

const files = walk(srcRoot).filter((f) => !skip.has(f))

let updated = 0
for (const file of files) {
  const base = path.basename(file, '.stories.tsx')
  const id = toDocId(base)
  let source = fs.readFileSync(file, 'utf8')

  if (source.includes('componentDocsParameters')) {
    console.log('skip (already wired):', path.relative(root, file))
    continue
  }

  // Ensure Meta import exists (already there typically)
  if (!source.includes("from '@storybook/react-vite'")) {
    console.warn('no storybook import:', file)
    continue
  }

  const importLine = `import { componentDocsParameters } from '@/docs/ComponentDocsPage'\n`
  if (!source.includes(importLine.trim())) {
    // Insert after last import
    const importBlock = source.match(/^(?:import .+?\n)+/s)
    if (!importBlock) {
      console.warn('no imports:', file)
      continue
    }
    source = source.replace(importBlock[0], importBlock[0] + importLine)
  }

  // Inject parameters into meta object
  if (/parameters\s*:\s*\{/.test(source)) {
    source = source.replace(
      /parameters\s*:\s*\{/,
      `parameters: {\n    ...componentDocsParameters('${id}'),`,
    )
  } else if (/tags\s*:\s*\[[^\]]*\]/.test(source)) {
    source = source.replace(
      /tags\s*:\s*\[[^\]]*\]/,
      (match) => `${match},\n  parameters: {\n    ...componentDocsParameters('${id}'),\n  }`,
    )
  } else if (/const meta = \{/.test(source)) {
    source = source.replace(
      /const meta = \{/,
      `const meta = {\n  parameters: {\n    ...componentDocsParameters('${id}'),\n  },`,
    )
  } else {
    console.warn('could not inject parameters:', file)
    continue
  }

  // Ensure autodocs tag for Charts/Dashboard
  if (!source.includes("'autodocs'") && !source.includes('"autodocs"')) {
    if (/tags\s*:\s*\[/.test(source)) {
      source = source.replace(/tags\s*:\s*\[/, "tags: ['autodocs', ")
    } else {
      source = source.replace(
        /parameters\s*:\s*\{/,
        `tags: ['autodocs'],\n  parameters: {`,
      )
    }
  }

  fs.writeFileSync(file, source)
  updated += 1
  console.log('wired', id, '←', path.relative(root, file))
}

console.log(`\nUpdated ${updated} files.`)
