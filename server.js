
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createServer } = require('http')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { parse } = require('url')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const next = require('next')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { initSocketServer } = require('./server/socketServer')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  initSocketServer(server)

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

