import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';

@Pipe({
  name: 'img',
  pure: false
})
export class ImgPipe implements PipeTransform {

  transform(chatRoom: any): string {
    return chatRoom && chatRoom.iconUrl ? chatRoom.iconUrl : 'assets/picture.svg';
  }

}
