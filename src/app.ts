import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as KoaBody from 'koa-bodyparser'
import * as KoaJwt from 'koa-jwt'

import { MongoClient } from 'mongodb'

import { buildSchema } from 'graphql'
import { graphqlKoa, graphiqlKoa} from 'graphql-server-koa'
import {makeExecutableSchema} from 'graphql-tools'

import {Login}  from './middlewares/login'
import {Upload} from './middlewares/upload'

import {buildDirSchema} from './utils/buildDirSchema'
import {resolversMap} from './resolvers'

const app = new Koa()
const router = new KoaRouter()


app.use(KoaBody())
app.use(Login)


app.use(KoaJwt({
    secret: 'hellospoc'
}))

const schema = makeExecutableSchema({
    typeDefs: buildDirSchema('src/schemas'),
    resolvers: resolversMap
})

router.post('/upload', Upload)
router.post('/api', (ctx) => (graphqlKoa({schema, context: {user: ctx.state.user}})(ctx)))
router.get('/api', (ctx) => (graphqlKoa({schema, context: {user: ctx.state.user}})(ctx)))

/** graphql 调试工具 */
router.get('/graphiql', graphiqlKoa({ endpointURL: '/api' }))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
