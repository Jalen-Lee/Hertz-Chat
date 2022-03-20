import { registerAs } from '@nestjs/config'

export default registerAs('qiniu', () => ({
  accessKey: process.env.QINIU_ACCESS_KEY,
  secretKey: process.env.QINIU_SECRET_KEY,
  bucket: process.env.QINIU_BUCKET,
  zone: process.env.QINIU_ZONE,
  assetsDomain: process.env.QINIU_ASSETS_DOMAIN,
}))
