declare module 'koa-graphql' {
    interface Options {
        schema?: any
        graphiql?: boolean

    }
    const graphqlHTTP: (ops: Options) => any
    export default graphqlHTTP
}