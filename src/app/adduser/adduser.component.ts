import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../Entities/user';
import { Driver } from 'selenium-webdriver/opera';
import { Constants } from '../constants';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  get searchNewContactInputText(): string{
    return this.chatService.searchNewContactInputText;
  }
  set searchNewContactInputText(val: string){
    this.chatService.searchNewContactInputText = val;
  }

  get newContactsList() : User[]{
    return this.chatService.newContactsList;
  }
  set newContactsList(val : User[]){
    this.chatService.newContactsList = val;
  }

  constructor(private chatService : ChatService, private constants:Constants) { }

  triggerNewContactSearch(){
      this.chatService.triggerNewContactSearch();
  }

  ngOnInit() {
  }

  change(event:any) {
    console.log(event.target.files);
    }

}
