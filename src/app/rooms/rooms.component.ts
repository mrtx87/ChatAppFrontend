import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  
  get availableRooms() : string[] {
    return this.chatService.availableRooms;
  }
  set availableRooms(val : string[]){
    this.chatService.availableRooms = val;
  }
  

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
