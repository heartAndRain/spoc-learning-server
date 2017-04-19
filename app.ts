import * as Koa from 'koa'
import { graphqlKoa } from 'graphql-server-koa'
import * as KoaRouter from 'koa-router'
import * as KoaBody from 'koa-bodyparser'

import { buildSchema } from 'graphql'

const app = new Koa()
const router = new KoaRouter()

const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

app.use(KoaBody())


router.post('/api', graphqlKoa({schema}))
router.get('/api', graphqlKoa({schema}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)


