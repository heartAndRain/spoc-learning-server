import {IResolver} from './IResolver'
import HomeworkModels from '../models/Homework'

export const Homework: IResolver = {
    hwId(obj, args, context) {
        return obj._id
    },
    type(obj, args, context) {
        return obj.type
    },
    name(obj, args, context) {
        return obj.name
    },
    async score(obj, args, context) {
         const score: any = await HomeworkModels.getHomeworkScore(context.user.userId, obj._id)
    
         return score && score.score || null
    },
    async pass(obj, args, context) {
        const score: any = await HomeworkModels.getHomeworkScore(context.user.userId, obj._id)
        return score && score.pass || null
    },
    deadline(obj, args, context) {
        return obj.deadline
    },
    questions(obj, args, context) {
        return obj.questions
    }
}

export const Question: IResolver = {
    title(obj, args, context) {
        return obj.title
    },
    options(obj, args, context) {
        return obj.options
    }
}

export const SelectOption: IResolver = {
    index(obj, args, context) {
        return obj.index
    },
    content(obj, args, context) {
        return obj.content
    }
}