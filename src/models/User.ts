import BaseModel from './BaseModel'
import IModel from './IModel'
import {DB, DBType} from '../database'

export interface User {
    _id?: number
    username: string
    nickname: string
    // 学生，老师，助教，管理员
    role: 'stu' | 'tea' | 'ass' |'admin'
    password: string
    // 用户账户状态：正常 | 异常
    stat: 'normal' | 'exception'
}


class UserModels extends BaseModel {

    /**
     * 插入一个用户
     * @param user 用户
     */
    async insertOneUser(user: User) {
        const userId = await super.getNextSequence('userId')
        return this.cnt.collection('user').insertOne(Object.assign({}, user, {_id: +userId}))
    }

    /**
     * 查找 by userId
     * @param userId 用户id
     */

     async getUserByUserId(userId: number) {
        return this.cnt.collection('user').findOne({
            _id: userId
        })
     }


    /**
     * 查找 by username
     * @param username 用户名
     */
    async getUserByUsername(username: string) {
        return this.cnt.collection('user').findOne({username})
    }

    /**
     * 用户选课
     * @param userId 用户ID
     * @param courseId 课程ID
     */
    async selectOneCourse(userId: number, courseId: number) {
        return this.cnt.collection('user').updateOne(
            { _id: userId },
            { $addToSet: { selectedCourse: courseId } }
        )
    }
}

export default new UserModels