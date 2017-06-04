import {IResolver} from './IResolver'
import Course from '../models/Course'
import Homework from '../models/Homework'

export const Episode: IResolver = {
    episodeId(obj, args, context) {
        return obj._id
    },
    type(obj, args, context) {
        return obj.type
    },
    name(obj, args, context) {
        return obj.name
    },
    itemList(obj, args, context) {
        return Course.getCourseItemById(obj.itemList)
    }
}

export const EpisodeItem: IResolver = {
    itemId(obj, args, context) {
        return obj._id
    },
    name(obj, args, context) {
        return obj.name
    },
    introduce(obj, args, context) {
        return obj.introduce
    },
    video(obj, args, context) {
        return obj.video
    },
    source(obj, args, context) {
        return Course.getSourseById(obj.source)
    },
    homework(obj, args, context) {
        return Homework.getHomeworkById(obj.homework)
    }
}