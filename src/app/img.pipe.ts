import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';
import { ValueResolver } from './value.resolver';

@Pipe({
  name: 'img',
  pure: false
})
export class ImgPipe implements PipeTransform {

  transform(chatRoom: ChatRoom): string {

    if(chatRoom.groupChat) {
      return chatRoom && chatRoom.iconUrl ? chatRoom.iconUrl : 'assets/picture.svg';
    }
    let iconUrl = this.values.resolveNotLocalUserIconUrl(chatRoom);
    return iconUrl ? iconUrl : 'assets/picture.svg';
  }

  constructor(private values: ValueResolver) {

  }

}
