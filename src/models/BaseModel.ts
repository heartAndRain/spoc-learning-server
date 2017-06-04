import IModel from './IModel'
import {DB, DBType} from '../database'
import logger from '../utils/logger'
import AsyncErrorHandler from '../utils/async-error-handler'


export default class BaseModel implements IModel {
    constructor() {
    }

    get cnt() {
        return DB.getConnection()
    }

    /*** 获取记录指针 */
    protected async getNextSequence(fieldName: string) {
        let ret = await this.cnt.collection('counters').findOneAndUpdate(
            { _id: fieldName },
            { $inc: {seq: 1} },
            {
                returnOriginal: false
            }
        )
        return ret.value.seq
    }
}