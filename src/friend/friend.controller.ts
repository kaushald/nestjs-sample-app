import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { Friend } from './friend.entity';

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  findAll() {
    const friends = this.friendService.findAll();
    return friends.map((friend) => ({
      ...friend,
      _links: {
        self: { href: `/friends/${friend.id}` },
        update: { href: `/friends/${friend.id}` },
        delete: { href: `/friends/${friend.id}` },
      },
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const friend = this.friendService.findOne(+id);
    return {
      ...friend,
      _links: {
        self: { href: `/friends/${id}` },
        update: { href: `/friends/${id}` },
        delete: { href: `/friends/${id}` },
      },
    };
  }

  @Post()
  create(@Body() friend: Partial<Friend>) {
    const newFriend = this.friendService.create(friend);
    return {
      ...newFriend,
      _links: {
        self: { href: `/friends/${newFriend.id}` },
        update: { href: `/friends/${newFriend.id}` },
        delete: { href: `/friends/${newFriend.id}` },
      },
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Friend>) {
    const updatedFriend = this.friendService.update(+id, updateData);
    return {
      ...updatedFriend,
      _links: {
        self: { href: `/friends/${id}` },
        update: { href: `/friends/${id}` },
        delete: { href: `/friends/${id}` },
      },
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.friendService.delete(+id);
    return { message: `Friend with ID ${id} deleted.` };
  }
}
