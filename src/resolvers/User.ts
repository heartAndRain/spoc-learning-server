import {IResolver} from './IResolver'
import CourseModels from '../models/Course'

export const User: IResolver = {
    userId(obj, args, context) {
        return obj._id
    },
    username(obj, args, context) {
        return obj.username
    },
    nickname(obj, args, context) {
        return obj.nickname
    },
    school(obj, args, context) {
        return obj.school
    },

    role(obj, args, context) {
        return obj.role
    },
    stat(obj, args, context) {
        return obj.stat
    },
    selectedCourse(obj, args, context) {
        if (!obj.selectedCourse) return []
        return obj.selectedCourse.map(async (courseId: number) => {
            return await CourseModels.getCourseById(courseId)
        })
    },
    async createdCourse(obj, args, context) {
        return await CourseModels.getUserCreatedCourse(obj._id) || []
    }

}

export const UserInfo: IResolver = {
    userId(obj, args, context) {
        return obj.userId
    },
    username(obj, args, context) {
        return obj.username
    },
    role(obj, args, context) {
        return obj.role
    },
    stat(obj, args, context) {
        return obj.stat
    }
}