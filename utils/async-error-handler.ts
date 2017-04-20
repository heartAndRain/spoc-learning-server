import logger from './logger'

export default function AsyncErrorHandler(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFn = descriptor.value
    return Object.assign({}, descriptor, {
        value: async function(...args: any[]) {
            try {
                await oldFn(...args)
            } catch(err) {
                logger.warn(err)
            }
        }
    })
}