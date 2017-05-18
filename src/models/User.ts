import BaseModel from './BaseModel'

export interface User {
    userId: number
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
    async insertOnUser(user: User) {
        return super.transaction((db) => {
            return db.collection('User').insertOne(user)
        })
    }
    /**
     * 查找
     * @param username 用户名
     */
    async getUserByUsername(username: string) {
        return super.transaction<User>((db) => {
            return db.collection('User').findOne({username})
        })
    }
}

export default new UserModels