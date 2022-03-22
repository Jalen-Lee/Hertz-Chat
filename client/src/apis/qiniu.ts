import request from '../utils/request'

export async function getUploadToken() {
  return request.get<{ code: number; data: any; err_msg: string }>(
    '/storage/uploadToken',
  )
}
