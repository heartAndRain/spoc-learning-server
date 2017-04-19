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
        list: [Int]
    }
`)

const root = {
    hello() {
        return 'hello'
    },
    list() {
        return [1,2,3]
    }
}

app.use(KoaBody())


router.post('/api', graphqlKoa({schema, rootValue: root}))
router.get('/api', graphqlKoa({schema, rootValue: root}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)


