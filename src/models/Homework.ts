import BaseModel from './BaseModel'
import {ObjectID} from 'mongodb'

export interface Homework {
    _id?: number
    username: string
    nickname: string
    // 学生，老师，助教，管理员
    role: 'stu' | 'tea' | 'ass' |'admin'
    password: string
    // 用户账户状态：正常 | 异常
    stat: 'normal' | 'exception'
}

class HomeworkModels extends BaseModel {
    /**
     * 获取作业信息
     * @param hwId 作业id
     */
    async getHomeworkById(hwId: string | string[]) {
        
        if (typeof hwId === 'string') {
            return this.cnt.collection('homework').findOne({
                _id: new ObjectID(hwId as string)
            })
        }
        
        return Promise.all(hwId.map((id) => {
            return this.cnt.collection('homework').findOne({
                _id: new ObjectID(id)
            })
        }))
    }
    /**
     * 获取作业成绩
     * @param userId 用户ID
     * @param hwId 作业ID
     */
    async getHomeworkScore(userId: number, hwId: string) {
        
        return this.cnt.collection('score').findOne({
            userId,
            hwId
        })
    }

   
}

export default new HomeworkModels