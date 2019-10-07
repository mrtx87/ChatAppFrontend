import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ValueResolver } from '../value.resolver';
import { User } from '../Entities/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name : string = "";
  info : string = "";

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  constructor(private chatService: ChatService, private store: DataStore,
              private constants: Constants, private values: ValueResolver) { }

  ngOnInit() {
    this.name = this.localUser.name;
    this.info = this.localUser.info;
  }

  valid() : boolean {
      if(this.name != this.localUser.name || this.info != this.localUser.info) {
        return true;
      }
  }


}
