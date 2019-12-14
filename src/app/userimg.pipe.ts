import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';
import { ValueResolver } from './value.resolver';

@Pipe({
  name: 'userImg', 
  pure: false

})
export class UserimgPipe implements PipeTransform {

  transform(userId: string): string {
    if (!userId) {
      return 'assets/default-user-icon.svg';
    }
    let iconUrl = this.values.resolveUserIconUrl(userId);
    return iconUrl ? iconUrl : 'assets/default-user-icon.svg';
  }

  constructor(private values: ValueResolver) {

  }
}
