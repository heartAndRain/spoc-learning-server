import * as Koa from 'koa'
import * as jwt from 'jsonwebtoken'

import UserModels from '../models/User'


export async function Login(ctx: Koa.Context, next: () => Promise<any>) {
    if (ctx.request.method.toLowerCase() === 'post'
        && ctx.request.path === '/login') {
        
        // user: username, key: password
        const {user, key} = ctx.request.body
        const userInfo = await UserModels.getUserByUsername(user)

        if (!userInfo) {
            ctx.response.body = {
                errNum: 2,
                message: 'username does not exist'
            }
            return
        }
        if (('' + userInfo.password) !== (''+ key)) {
            ctx.response.body = {
                errNum: 1,
                message: 'wrong password'
            }
            return
        }

        // sign
        const tokenData = {
            userId: userInfo._id,
            username: userInfo.username,
            role: userInfo.role,
            stat: userInfo.stat
        }
        const secret = 'hellospoc'

        const token = jwt.sign(tokenData, secret, {
            expiresIn: '7d'
        })

        ctx.response.body = {
            token,
            errNum: 0,
            message: 'login success'
        }

    } else {
        return next()
    }
}