import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { QiniuService } from './qiniu.service'

@Controller('storage')
export class QiniuController {
  constructor(private readonly qiniuService: QiniuService) {}

  @Get('uploadToken')
  async getUploadToken(@Query() query: any): Promise<any> {
    const uploadToken = await this.qiniuService.createUploadToken()
    return {
      uploadToken,
    }
  }

  /**
   * 上传单个文件
   * @param body
   * @param file
   */
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      //console.log('file', file)
      if (file.size > 3145728) {
        return {
          code: 1,
          err_msg: `The file size cannot be larger than 3M`,
        }
      }
      const data = await this.qiniuService.uploadFile(file)
      return {
        code: 0,
        data,
        err_msg: `File uploaded successfully!`,
      }
    } catch (err) {
      return {
        code: 1,
        err_msg: `Failed to upload files: ${err.toString()}`,
      }
    }
  }
}
