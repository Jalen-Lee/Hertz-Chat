import { Buffer } from 'buffer'
import * as stream from 'stream'

/**
 * 将buffer转换成stream
 * @param data
 */
export function bufferToStream(data: Buffer) {
  const bufferStream = new stream.PassThrough()
  bufferStream.end(data)
  return bufferStream
}
