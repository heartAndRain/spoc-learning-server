import * as Koa from 'koa'
import * as Formidable from 'formidable'
import * as KoaRouter from 'koa-router'
import * as Fs from 'fs'
import * as Qiniu from '../utils/qiniu'

async function multiParse(req: any) {
    return new Promise<{fields: any, files: any}>((resolve, reject) => {
        const formData = new Formidable.IncomingForm()
        formData.parse(req, (err, fields, files) => {
            if (err) {
                reject(err)
            }
            resolve({
                fields,
                files
            })
        })
    })
}

export async function Upload(ctx: KoaRouter.IRouterContext, next: () => Promise<any>) {
    const {fields, files} = await multiParse(ctx.req)
    if (Object.keys(files).length === 0) {
        ctx.status = 200
        ctx.body = {
            status: 0,
            message: '未找到上传文件'
        }
        return
    }
    if (!fields.types) {
        ctx.status = 200
        ctx.body = {
            status: 0,
            message: '缺少文件类型'
        }
        return
    }
    const fileTypes: string[] = fields.types.split(',')

    try {
        const qiniuFiles = Object.keys(files).map(async (fileKey: any, index: number) => {
            
            const file = files[fileKey]
            const hashName = await Qiniu.getEtag(Fs.readFileSync(file.path))
            //console.log(file)
            
            // 替换成hash name
            const fileName = file.name.replace(/.*(\.\w*)$/, `${hashName}$1`)
            
            return await Qiniu.uploadFile(fileName, file.path, fileTypes[index])
        })
        
        const filesName = (await Promise.all(qiniuFiles)).map(file => file.key)
        console.log('上传成功')
        ctx.status = 200
        ctx.body = {
            status: 1,
            message: '上传成功',
            fileName: filesName.length === 1 ? filesName[0] : filesName
        }
        return
    } catch(e) {
        console.log(e)
        ctx.status = 200
        ctx.body = {
            status: 0,
            message: '上传失败'
        }
    }
    
    
}