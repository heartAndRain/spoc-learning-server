import {IResolver} from './IResolver'
import CategoryModels from '../models/Category'
import UserModels from '../models/User'
import CourseModels from '../models/Course'

export const Course: IResolver = {
    courseId(obj, args, context) {
        return obj._id
    },
    name(obj, args, context) {
        console.log(context)
        return obj.name
    },
    type(obj, args, context) {
        return obj.type
    },
    introduce(obj, args, context) {
        return obj.introduce
    },
    category(obj, args, context) {
        const categoryId = +obj.category
        return CategoryModels.getCourseCategory(categoryId)
    },
    cover(obj, args, context) {
        return obj.cover
    },
    teacher(obj, args, context) {
        const userId = +obj.teacher
        return UserModels.getUserByUserId(userId)
    },
    async episodes(obj, args, context) {
        let a = await CourseModels.getEpisodeById(obj.episodes)
        
        return a
    },
}