import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { GroupService } from './group.service'
import { ErrorCode } from '../../common/constants'

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async createGroup(@Body() body: any): Promise<any> {
    return this.groupService.createGroup(body)
  }

  @Get('attendees')
  async getAttendees(@Query() query: any): Promise<any> {
    const { groupId } = query
    return this.groupService.getAttendees(groupId)
  }

  @Get('groups')
  async getUserGroups(@Query() query: any): Promise<any> {
    try {
      const { uid } = query
      const { data } = await this.groupService.getUserGroups(uid)
      return {
        code: ErrorCode.SUCCESS,
        data: {
          groups: data,
        },
        err_msg: '获取用户所有群聊成功！',
      }
    } catch (err) {
      return {
        code: ErrorCode.UNKNOWN_ERROR,
        err_msg: err.toString(),
      }
    }
  }
}
