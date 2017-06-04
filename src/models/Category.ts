import BaseModel from './BaseModel'

export interface Category {
    /**
     * 学科ID
     */
    categoryId: number
    /**
     * 学科名称
     */
    name: string
    /**
     * 学科封面
     */
    cover: string
}

class CategoryModels extends BaseModel {
    
    /**
     * 获取学科目录列表
     */
    async getCategoryList() {
        return this.cnt.collection('category').find({}).toArray()
    }

    /**
     * 获取学科信息
     * @param categoryId 学科id
     */
    async getCourseCategory(categoryId: number) {
        return this.cnt.collection('category').findOne({
            _id: categoryId
        })
    }
}

export default new CategoryModels