declare module 'koa-graphql' {
    interface Options {
        schema?: any
        graphiql?: boolean

    }
    const graphqlHTTP: (ops: Options) => any
    export default graphqlHTTP
}

declare module 'invariant' {
    function invariant (condition: boolean | string, message: string, ...args: string[]): void;
    export default invariant;
}