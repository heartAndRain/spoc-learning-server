import {IResolver} from './IResolver'
import CourseModels from '../models/Course'
import HomeworkModels from '../models/Homework'


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
        return CourseModels.getCourseItemById(obj.itemList)
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
        return CourseModels.getSourseById(obj.source)
    },
    homework(obj, args, context) {
        return HomeworkModels.getHomeworkById(obj.homework)
    }
}


// {
//     "_id" : 3001,
//     "name" : "数据结构与算法",
//     "type" : 0,
//     "introduce" : "这里是课程介绍",
//     "category" : 2000,
//     "cover" : "shujujiegou.jpeg",
//     "teacher" : 1017,
//     "episodes": [
//         {
//             "type": 0,
//             "itemList": [
            
//                 {
//                       "name": "介绍",
//                       "introduce": "这里是课程的介绍",
//                       "video": "test.wmv",
//                       "source": [
                        
//                     ]
//                 }
//             ]
            
//         }
//     ]
// }