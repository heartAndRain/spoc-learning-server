import db, { Database,  MongoClient, Db,} from '../database'
import logger from '../utils/logger'
import AsyncErrorHandler from '../utils/async-error-handler'


export default class BaseModel {
    /** 数据库实例 */
    protected db: Database<MongoClient>

    constructor() {
        this.db = db.getDatabase()
    }

    /** 数据库操作事务 */
    protected async transaction<T>(doSomeThingWithDb: (db: Db) => Promise<any>) {
        return new Promise<T>(async (resolve, reject) => {
            try {
                // 打开连接
                const db = await this.db.connect('spoc')
                // 操作数据库
                const result = await doSomeThingWithDb(db)
                // 关闭连接
                await db.close()

                resolve(result)
            } catch(err) {
                // invariant(err, JSON.stringify(err))
                logger.error(err)
                reject(false)
            }
        })
    }

    protected async getNextSequence(db: Db, fieldName: string) {
        let ret = await db.collection('counters').findOneAndUpdate(
            { _id: fieldName },
            { $inc: {seq: 1} },
            {
                returnOriginal: false
            }
        )
        return ret.value.seq
    }
}