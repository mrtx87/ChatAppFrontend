import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Contact } from '../Entities/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  get contacts(): Contact[] {
    return this.chatService.contacts;
  }
  set contacts(val: Contact[]) {
    this.chatService.contacts = val;
  }

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
