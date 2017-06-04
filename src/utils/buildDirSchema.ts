import { readdirSync, readFileSync } from 'fs'
import * as path from 'path'
import {
    GraphQLSchema,
    buildSchema
} from 'graphql'

export function buildDirSchema(dirName: string): any {
    const schema = readdirSync(path.resolve(dirName))
        .filter((fileName) => /\w*.gql$/.test(fileName))
        .map((gqlFile) => readFileSync(path.resolve(dirName, gqlFile)).toString())
        .reduce((previous, current) => previous + current)

    return schema
}