import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  },
})

export default withNextra({
  reactStrictMode: true,
  transpilePackages: ['nextra', 'nextra-theme-docs'],
})