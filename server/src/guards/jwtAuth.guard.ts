import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  /**
   * 此函数在守卫验证后一定会触发，不论验证是否通过，return的值会透传下去进一步处理，抛出的错误会作为响应返回
   * @param err
   * @param user
   * @param info
   */
  handleRequest(err, user, info) {
    console.log('handleRequest', err, user, info)
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw new UnauthorizedException({
        code: 401,
        err_msg: err ? err.toString() : info.toString(),
      })
    }
    return user
  }
}
