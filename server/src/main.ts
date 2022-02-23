import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { resolve } from 'path'
import * as csrf from 'csurf'
import * as os from 'os'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 设置swagger文档相关配置
  // const swaggerOptions = new DocumentBuilder()
  //   .setTitle('Grace-Chat API Document')
  //   .setDescription('Grace-Chat project')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build()
  // const document = SwaggerModule.createDocument(app, swaggerOptions)
  // SwaggerModule.setup('doc', app, document)

  // 配置静态资源访问
  app.useStaticAssets(resolve(__dirname, '../public'), {
    prefix: '/static/',
    setHeaders: (res) => {
      res.set('Cache-Control', 'max-age=2592000') // 资源有效期一个月
    },
  })
  // 启用跨域
  app.enableCors()
  // 启用csrf中间件
  // app.use(csrf())

  // API 设置全局前缀
  app.setGlobalPrefix('/api/v1')

  await app.listen(4396)
}

bootstrap().then(() => {
  console.log('hertz-server 已启动')
})
