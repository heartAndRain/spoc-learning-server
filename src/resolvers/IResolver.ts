export interface IResolver {
    [prop: string]: (obj: any, args: any, context: any) => any
}