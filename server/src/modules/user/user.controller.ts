import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common'
import UserService from './user.service'
import { JwtAuthGuard } from '../../guards/jwtAuth.guard'
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Query() query: any): Promise<any> {
    const { uid } = query
    return this.userService.getProfile(uid)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/profile')
  async updateProfile(@Body() body: any): Promise<any> {
    return this.userService.updateProfile(body)
  }
}
