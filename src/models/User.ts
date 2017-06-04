import BaseModel from './BaseModel'

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
        return super.transaction(async (db) => {
            const userId = await super.getNextSequence(db, 'userId')
            return db.collection('user').insertOne(Object.assign({}, user, {_id: +userId}))
        })
    }

    /**
     * 查找 by userId
     * @param userId 用户id
     */

     async getUserByUserId(userId: number) {
         return super.transaction((db) => {
             return db.collection('user').findOne({
                 _id: userId
             })
         })
     }


    /**
     * 查找 by username
     * @param username 用户名
     */
    async getUserByUsername(username: string) {
        return super.transaction<User>((db) => {
            return db.collection('user').findOne({username})
        })
    }

    /**
     * 用户选课
     * @param userId 用户ID
     * @param courseId 课程ID
     */
    async selectOneCourse(userId: number, courseId: number) {
        return super.transaction((db) => {
            return db.collection('user').updateOne(
                { _id: userId },
                { $addToSet: { selectedCourse: courseId } }
            )
        })
    }
}

export default new UserModels