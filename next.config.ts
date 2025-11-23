import { fileURLToPath } from 'url'
import path from 'path'
import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
})

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url))

export default withNextra({
  reactStrictMode: true,
  transpilePackages: ['nextra', 'nextra-theme-docs'],
})