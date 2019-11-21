import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';
import { DataStore } from './data.store';
import { ChatService } from './chat.service';
import { ValueResolver } from './value.resolver';
import * as moment from 'moment';


@Pipe({
  name: 'latestChatMessageDate',
  pure: false
})
export class LatestChatMessageDatePipe implements PipeTransform {

  transform(chatRoom: ChatRoom): string {
    


      let dateString : string = this.values.resolveLatestChatMessageDate(chatRoom);
      let date : moment.Moment = moment(dateString);
      let d :moment.Moment = moment();

      if(d.dayOfYear() == date.dayOfYear()) {
        return date.format("hh:mm");
      }
      
      if(d.dayOfYear() - date.dayOfYear() == 1)
        return "Gestern";

      if(d.dayOfYear() - date.dayOfYear() <= 7){
        if(date.weekday() == 1) 
          return "Montag";
        if(date.weekday() == 2) 
          return "Dienstag";
        if(date.weekday() == 3)
          return "Mittowch";
        if(date.weekday() == 4)
          return "Donnerstag"; 
        if(date.weekday() == 5)
          return "Freitag";
        if(date.weekday() == 6)
          return "Samstag";
        if(date.weekday() == 7)
          return "Sonntag";
      } 
      
     // if(d.dayOfYear() - date.dayOfYear() > 7)
        return date.date() + "." + (date.month() + 1) + "." + date.year();

     // return dateString;
  }

  constructor(private store: DataStore, private chatService: ChatService, private values: ValueResolver) { }

}
