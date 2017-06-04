import {IResolver} from './IResolver'
import Category from '../models/Category'
import User from '../models/User'
import CourseModel from '../models/Course'

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
        return Category.getCourseCategory(categoryId)
    },
    cover(obj, args, context) {
        return obj.cover
    },
    teacher(obj, args, context) {
        const userId = +obj.teacher
        return User.getUserByUserId(userId)
    },
    async episodes(obj, args, context) {
        let a = await CourseModel.getEpisodeById(obj.episodes)
        
        return a
    },
}