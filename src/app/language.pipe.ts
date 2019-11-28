import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';

@Pipe({
  name: 'tl8',
  pure: false
})
export class LanguagePipe implements PipeTransform {


  constructor(private langService: LanguageService) {

  }

  transform(text_key: string): any {
    if(this.langService) {
      return this.langService.resolveText(text_key);
    }

    return text_key;
  }


}
