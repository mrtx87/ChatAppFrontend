import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ValueResolver } from '../value.resolver';
import { User } from '../Entities/user';
import { ImageService } from '../image.service';
import { Contact } from '../Entities/contact';
import { ChatRoom } from '../Entities/chat.room';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.css']
})
export class ContactProfileComponent implements OnInit {
  currentlyDisplayedContact: Contact = new Contact();




  set currentDisplayedLeftPanel(value: string) {
    this.chatService.currentDisplayedLeftPanel = value;
  }

  get currentDisplayedLeftPanel(): string {
    return this.chatService.currentDisplayedLeftPanel;
  }

  get currentDisplayedRightPanel(): string {
    return this.chatService.currentDisplayedRightPanel;
  }

  set currentDisplayedRightPanel(value: string) {
    this.chatService.currentDisplayedRightPanel = value;
  }

  constructor(private chatService: ChatService, private store: DataStore,
    private constants: Constants, private values: ValueResolver, private imageService: ImageService) {
    this.chatService.registerContactProfileComponent(this);
  }

  get commonGroups(): ChatRoom[] {
    let rooms: ChatRoom[] = [...this.chatService.availableRooms.values()];
    let filteredRooms = [];
    for(let room of rooms){
      if(this.isInRoom(room.userIds) && room.groupChat){
        filteredRooms.push(room);
      }
    }

    return filteredRooms;
  }

  isInRoom(userIds: string[]) : boolean{
    for(let userId of userIds){
      if(userId == this.currentlyDisplayedContact.id){
        return true;
      }
    }
    return false;
  }

  switchDisplayedRoom(cGroup: ChatRoom){
    this.initSlideOut()
    this.chatService.displayedChatRoom = cGroup;
  }

  ngOnInit() {
  }

  init(contact: Contact) {
    this.currentlyDisplayedContact = contact;
  }

  jumpBack() {
    this.currentDisplayedRightPanel = null;
  }


  slideOut: boolean = false;
  intervalTimer = 0;

  initSlideOut() {
    this.slideOut = true;
    let that = this;

    let interval = setInterval(function () {
      that.intervalTimer += 10;
      if (that.intervalTimer >= 300) {
        that.jumpBack();
        clearInterval(interval);
      }
    }, 10)
  }

  removeContact(){
    if(this.currentlyDisplayedContact){
      console.log("Ya rly want to remove "+ this.currentlyDisplayedContact.name +", huh? Well, let's give it a try.");
      // let chatRoom: ChatRoom = this.values.resolveDialogRoomByContact(contact);
      this.chatService.sendRemoveContact(this.currentlyDisplayedContact, this.values.resolveDialogRoomByContact(this.currentlyDisplayedContact));
      this.initSlideOut();
    }else{
      console.log("Don't remove anything as there was no other user. (Which is strange. You should investigate this.");
    }
  }

}

