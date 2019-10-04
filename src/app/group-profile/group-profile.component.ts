import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ValueResolver } from '../value.resolver';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ChatRoom } from '../Entities/chat.room';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {


  room: ChatRoom;

  constructor(private chatService: ChatService, private values: ValueResolver, private store: DataStore, private constants: Constants) {
  }

  getCreatingChatRoom() {

  }

  ngOnInit() {



  }

}
