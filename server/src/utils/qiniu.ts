import { bufferToStream } from './buffer'
import * as qiniu from 'qiniu'
import { Buffer } from 'buffer'

export async function uploadFileByStream(
  uploadToken: string,
  key: string,
  fileBuffer: Buffer,
  config: qiniu.conf.Config,
  putExtra: qiniu.form_up.PutExtra,
) {
  return new Promise((resolve, reject) => {
    const formUploader = new qiniu.form_up.FormUploader(config)
    formUploader.putStream(
      uploadToken,
      key,
      bufferToStream(fileBuffer),
      putExtra,
      function (err, data, info) {
        if (err) {
          reject(err)
        }
        if (info.statusCode === 200) {
          resolve(data)
        } else {
          reject({
            data,
            info,
          })
        }
      },
    )
  })
}
