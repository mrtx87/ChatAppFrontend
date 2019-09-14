import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../Entities/chat.room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  
  get availableRooms() : ChatRoom[] {
    return this.chatService.availableRooms;
  }
  set availableRooms(val : ChatRoom[]){
    this.chatService.availableRooms = val;
  }
  

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
