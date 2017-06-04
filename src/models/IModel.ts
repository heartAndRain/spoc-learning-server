import {DBType} from '../database'

interface IModel {
    /** 数据库连接实例 */
    readonly cnt: DBType
}

export default IModel