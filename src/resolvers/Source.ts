import {IResolver} from './IResolver'


export const Source: IResolver = {
    type(obj, args, context) {
        return obj.type
    },
    name(obj, args, context) {
        return obj.name
    },
    introduce(obj, args, context) {
        return obj.introduce
    },
    url(obj, args, context) {
        return obj.url
    }
}