import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'


@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: string): any {
    return value;
  }

}
