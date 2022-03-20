import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as qiniu from 'qiniu'
import { rs } from 'qiniu'
import { Express } from 'express'
import { nanoid } from 'nanoid'
import { uploadFileByStream } from '../../utils/qiniu'
import PutPolicyOptions = rs.PutPolicyOptions

/**
 * 七牛云Node SDK文档：https://developer.qiniu.com/kodo/1289/nodejs
 */
@Injectable()
export class QiniuService {
  // 七牛云账号配置
  config
  // 上传凭证有效时长：1天
  uploadTokenExpires = 86400
  // 文件上传成功响应体，使用七牛支持的魔法变量和自定义变量：https://developer.qiniu.com/kodo/1235/vars#magicvar
  returnBody =
    '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","mimeType":"$(mimeType)","src":"http://cdn-ec.jaylenl.top/$(key)"}'

  constructor(private configService: ConfigService) {
    this.config = this.configService.get('qiniu')
  }

  /**
   * 创建上传凭证token
   */
  async createUploadToken() {
    const { accessKey, secretKey, bucket } = this.config
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    let options: PutPolicyOptions = {
      scope: bucket,
      returnBody: this.returnBody,
      expires: this.uploadTokenExpires,
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    return putPolicy.uploadToken(mac)
  }

  /**
   * 上传单个文件
   * @param file
   */
  async uploadFile(file: Express.Multer.File) {
    try {
      const config = new qiniu.conf.Config({
        zone: qiniu.zone[this.config.zone],
      })
      const putExtra = new qiniu.form_up.PutExtra()
      const uploadToken = await this.createUploadToken()
      const data = await uploadFileByStream(
        uploadToken,
        nanoid(),
        file.buffer,
        config,
        putExtra,
      )
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * 上传文件数组
   * @param files
   */
  async uploadFiles(files: Array<Express.Multer.File>) {}
}
