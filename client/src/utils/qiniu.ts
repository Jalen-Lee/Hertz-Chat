import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'
import { Config, Extra } from 'qiniu-js/esm/upload'

// 文档：https://developer.qiniu.com/kodo/1283/javascript
// file – 上传文件
// key – 目标文件名
// token – 上传凭证
// putExtra – 上传文件的相关资源信息配置
// config – 上传任务的配置

/**
 * 上传单个文件到七牛云
 * @param file
 * @param uploadToken
 * @param key
 * @param putExtra
 * @param config
 * @param observer
 */
export function uploadFile(
  file: File,
  uploadToken: string,
  key: string = nanoid(),
  putExtra?: Partial<Extra>,
  config?: Config,
  observer?: any,
) {
  const _putExtra: Partial<Extra> = {
    fname: file.name,
    mimeType: file.type,
  }
  putExtra = Object.assign(_putExtra, putExtra)
  const observable = qiniu.upload(file, key, uploadToken, putExtra, config)
  let subscription
  const task = new Promise((resolve, reject) => {
    subscription = observable.subscribe({
      next() {},
      error(err) {
        console.log('七牛文件上传错误', err)
        reject(err)
      },
      complete(data) {
        console.log('七牛文件上传成功', data)
        resolve(data)
      },
    })
  })

  return [subscription, task]
}
