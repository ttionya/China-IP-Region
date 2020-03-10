import Koa from 'koa'
import handle from './handler/handle'

const app = new Koa()

app
  .use(handle())
  .listen({
    port: process.env.NODE_PORT || 3000,
    host: process.env.NODE_HOST || '127.0.0.1',
  })
