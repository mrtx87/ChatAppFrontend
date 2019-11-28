import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Driver } from 'selenium-webdriver/opera';
import { Constants } from '../constants';
import { Contact } from '../Entities/contact';
import { User } from '../Entities/user';
import { DataStore } from '../data.store';
import { LanguageService } from '../language.service';

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

  get newContactsList() : Contact[]{
    return this.store.newContactsList;
  }
  set newContactsList(val : Contact[]){
    this.store.newContactsList = val;
  }

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  constructor(private chatService : ChatService, private constants:Constants, private store : DataStore,private langService : LanguageService) { }

  triggerNewContactSearch(){
      this.chatService.sendNewContactSearch();
  }

  ngOnInit() {
  }

  change(event:any) {
    console.log(event.target.files);
    }

  createRoom(contact:Contact){
    this.chatService.sendCreateRoomAndContact(contact);
    this.searchNewContactInputText = "";
    this.newContactsList = [];
  }

}
