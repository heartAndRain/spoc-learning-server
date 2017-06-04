import {IResolver} from './IResolver'

export const Category: IResolver = {
    categoryId(obj, args, context) {
        return obj._id
    },
   
    name(obj, args, context) {
        return obj.name
    },
    
    cover(obj, args, context) {
        return obj.cover
    }
}