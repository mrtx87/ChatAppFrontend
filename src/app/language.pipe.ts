import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';
import { ChatService } from './chat.service';

@Pipe({
  name: 'tl8',
  pure: false
})
export class LanguagePipe implements PipeTransform {


  constructor(private langService: LanguageService, private chatService: ChatService) {

  }

  transform(text_key: string): any {
    this.chatService.localUser

    if(this.langService) {
      return this.langService.resolveText(text_key);
    }


    return text_key;
  }


}
