const embedJsUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://boushi-bird.github.io/3594t-discard-bookmarklet/scripts/bundle.js'
    : 'http://localhost:8080/bundle.js'

const scriptId = 'VsD8NEfx'

const defines = {
  embedJsUrl,
  scriptId,
}

export default defines
