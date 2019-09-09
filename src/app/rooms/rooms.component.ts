import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chatroom } from '../Entities/chatroom';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  
  get availableRooms() : Chatroom[] {
    return this.chatService.availableRooms;
  }
  set availableRooms(val : Chatroom[]){
    this.chatService.availableRooms = val;
  }
  

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
