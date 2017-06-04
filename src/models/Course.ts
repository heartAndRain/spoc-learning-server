import BaseModel from './BaseModel'
import {ObjectID} from 'mongodb'

import {Category} from './Category'

export interface Course {
    id?: number
    name: string
    introduce?: string,
    cover?: string
    teacher?: number
    /**
     * 课程类型：0 : 按周类型 , 1 : 按章类型
     */
    type: 0 | 1
    /**
     * 课程所属学科
     */
    category: number
}

class CourseModel extends BaseModel {
    /**
     * 获取课程信息
     * @param courseId 课程id
     */
    async getCourseById(courseId: number) {
        return this.cnt.collection('course').findOne({
            _id: courseId
        })
    }
    /**
     * 获取用户创建的课程
     * @param userId 用户id
     */
    async getUserCreatedCourse(userId: number) {
        return this.cnt.collection('course').find({
            teacher: +userId
        }).toArray()
    }

    /**
     * 新增一门课程
     * @param course 课程对象
     */
    async insertOneCourse(course: Course) {
        const courseId = await this.getNextSequence('courseId')
        return this.cnt.collection('course').insertOne(Object.assign({}, course, {
            _id: courseId,
            episodes: []
        }))
    }

    /**
     * 获取片段信息
     * @param epsId 课程片段 Id
     */
    async getEpisodeById(epsId: string | string[]) {

        if (typeof epsId === 'string') {
            return this.cnt.collection('course_episode').findOne({
                _id: new ObjectID(epsId as string)
            })
        }
        
        return Promise.all(epsId.map((id) => {
            return this.cnt.collection('course_episode').findOne({
                _id: new ObjectID(id)
            })
        }))
    }

    async addNewEpisode(courseId: number, type: number, name: string = '') {
        
        const insertResult = await this.cnt.collection('course_episode').insertOne({
            type,
            name,
            itemList: []
        })

        if (insertResult.result.ok !== 1) return Promise.reject('新建episode失败')
        
        return this.cnt.collection('course').updateOne({_id: courseId}, {
            $addToSet: {episodes: insertResult.insertedId}
        })
    }

    /**
     * 获取每个课程项目
     * @param itemId 课程内容项目id
     */
    async getCourseItemById(itemId: string | string[]) {
        if (typeof itemId === 'string') {
            return this.cnt.collection('course_item').findOne({
                _id: new ObjectID(itemId as string) 
            })
        }

        return Promise.all(itemId.map((id) => {
            return this.cnt.collection('course_item').findOne({
                _id: new ObjectID(id)
            })
        }))
    }

    async getSourseById(sourceId: string | string[]) {
        
        if (typeof sourceId === 'string') {
            return this.cnt.collection('source').findOne({
                _id: new ObjectID(sourceId as string) 
            })
        }

        return Promise.all(sourceId.map((id) => {
            return this.cnt.collection('source').findOne({
                _id: new ObjectID(id)
            })
        }))
    }

}


export default new CourseModel

