import { Injectable } from '@nestjs/common';
import { Friend } from './friend.entity';

@Injectable()
export class FriendService {
  private friends: Friend[] = [];
  private idCounter = 1;

  findAll(): Friend[] {
    return this.friends;
  }

  findOne(id: number): Friend {
    return this.friends.find((friend) => friend.id === id);
  }

  create(friend: Partial<Friend>): Friend {
    const newFriend = { ...friend, id: this.idCounter++ } as Friend;
    this.friends.push(newFriend);
    return newFriend;
  }

  update(id: number, updateData: Partial<Friend>): Friend {
    const friend = this.findOne(id);
    if (friend) {
      Object.assign(friend, updateData);
    }
    return friend;
  }

  delete(id: number): void {
    this.friends = this.friends.filter((friend) => friend.id !== id);
  }
}
