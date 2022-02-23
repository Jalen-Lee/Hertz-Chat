import {
  Controller,
  Post,
  Request,
  Body,
  UseGuards,
  ValidationPipe,
  Get,
  Param,
  Req,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import AuthService from './auth.service'

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req, @Body(new ValidationPipe()) body: any): Promise<any> {
    return this.authService.login(req.user, body)
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/signup')
  async signup(
    @Request() req,
    @Body(new ValidationPipe()) body: any,
  ): Promise<any> {
    return this.authService.signup(body)
  }

  token校验

  // @UseGuards(AuthGuard('local'))
  @Post('/checkToken')
  async checkToken(@Body() body: any): Promise<any> {
    return await this.authService.checkToken(body)
  }

  // @Post('/register-test')
  // async registerTest(
  //   @Body(new ValidationPipe()) { username, password }: any,
  // ): Promise<any> {
  //   return await this.authService.registerTest({ username, password })
  // }
  //
  // @Get('/user-profile-test/:uid')
  // async getUserProfile(
  //   @Param(new ValidationPipe()) { uid }: any,
  // ): Promise<any> {
  //   return await this.authService.getUserProfile({ uid })
  // }
  //
  // @Post('/create-group-test')
  // async createGroup(
  //   @Body(new ValidationPipe()) { groupName, userId }: any,
  // ): Promise<any> {
  //   return await this.authService.createGroup({ groupName, userId })
  // }
  //
  // // 获取用户的所有群聊
  // @Get('/user-groups-test/:uid')
  // async getUserGroups(@Param(new ValidationPipe()) { uid }: any): Promise<any> {
  //   return await this.authService.getUserGroups({ uid })
  // }
  //
  // // 获取群聊的所有成员
  // @Get('/group-attendees-test/:groupId')
  // async getGroupAttendees(
  //   @Param(new ValidationPipe()) { groupId }: any,
  // ): Promise<any> {
  //   return await this.authService.getGroupAttendees({ groupId })
  // }
}
