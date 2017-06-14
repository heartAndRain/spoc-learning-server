import {Course} from './Course'
import {Category} from './Category'
import {User} from './User'
import {Episode, EpisodeItem} from './Episode'
import {Source} from './Source'
import {Homework, Question, SelectOption} from './Homewok'

import UserModels from '../models/User'
import CourseModels from '../models/Course'
import CategoryModels from '../models/Category'
import HomeworkModels from '../models/Homework'

export const resolversMap = {
    Query: {
        currentUser(obj: any, args: any, context: any) {
            // console.log('context...', context.user)
            return context.user
        },
        user(obj: any, args: any, context: any) {
            return UserModels.getUserByUserId(+args.id)
        },
        course(obj: any, args: any, context: any) {
            const courseId = +args.id
            return CourseModels.getCourseById(courseId)
        },
        courseItem(obj: any, args: any, context: any) {
            const itemId = args.id
            return CourseModels.getCourseItemById(itemId)
        },
        homework(obj: any, args: any, context: any) {
            return HomeworkModels.getHomeworkById(args.id)
        },
        categoryList(obj: any, args: any, context: any) {
            return CategoryModels.getCategoryList()
        },
        
    },
    Mutation: {
        addNewCourse(obj: any, {name, cover, type, introduce, category}: any, context: any) {
            return CourseModels.insertOneCourse({name, cover, type, introduce, category,teacher: context.user.userId})
        },
        addNewEpisodes(obj: any, {courseId, type, name}: any, context: any) {

            return CourseModels.addNewEpisode(courseId, type, name)
        },
        addNewCourseItem(obj: any, {episodeId, name, introduce, video, source}: any, context: any) {
            console.log(episodeId, name, introduce, video, source)
            return CourseModels.addNewCourseItem(episodeId, name, introduce, video, source)
        },
        selectCourse(obj: any, {courseId}: any, context: any) {
            return UserModels.selectOneCourse(1018, +courseId)
        }
    },
    Course,
    Category,
    User,
    Episode,
    EpisodeItem,
    Source,
    Homework,
    Question,
    SelectOption
}