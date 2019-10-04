import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Contact } from '../Entities/contact';
import { Constants } from '../constants';
import { DataStore } from '../data.store';
import { ValueResolver } from '../value.resolver';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {


  query: string = "";

  get contacts(): Contact[] {
    return this.store.contacts.filter(contact => contact.name.toLowerCase().includes(this.query));
  }
  set contacts(val: Contact[]) {
    this.store.contacts = val;
  }


  constructor(private chatService: ChatService, private values : ValueResolver, private constants: Constants, private store : DataStore) { }

  ngOnInit() {
  }

}
