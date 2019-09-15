import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { ChatRoom } from './Entities/chat.room';
import { AppComponent } from './app.component';
import { Contact } from './Entities/contact';
import { User } from './Entities/user';
import { TransferMessage } from './Entities/transfer.message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // LOGIN AND REGISTRATION PROPERTIES
  private registerUsername_: string;
  private registerPassword_: string;
  private registerPasswordRepeat_: string

  private loginUsername_: string = "default";
  private loginPassword_: string = "123";
  private searchNewContactInputText_: string;
  private newContactsList_: Contact[];

  //FORMS AND PAGE INPUTS
  private chatInputText_ : string;


  public appComponent: AppComponent;
  public registerAppComponent(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }



  //LOCAL USER PROPERTIES
  private localUser_: User;
  private isLoggedIn_: boolean = false;

  //DEBUG MOCKS

  private availableRooms_: ChatRoom[] = []; 
  private contacts_: Contact[] = [];

  get chatInputText(): string {
    return this.chatInputText_;
  }
  set chatInputText(val: string) {
    this.chatInputText_ = val;
  }

  get contacts(): Contact[] {
    return this.contacts_;
  }
  set contacts(val: Contact[]) {
    this.contacts_ = val;
  }

  get newContactsList(): Contact[] {
    return this.newContactsList_;
  }
  set newContactsList(val: Contact[]) {
    this.newContactsList_ = val;
  }
  
  get searchNewContactInputText(): string {
    return this.searchNewContactInputText_;
  }
  set searchNewContactInputText(val: string) {
    this.searchNewContactInputText_ = val;
  }
  
  get localUser(): User {
    return this.localUser_;
  }
  set localUser(val: User) {
    this.localUser_ = val;
  }
  
  get loginUsername(): string {
    return this.loginUsername_;
  }
  set loginUsername(val: string) {
    this.loginUsername_ = val;
  }
  
  get loginPassword(): string {
    return this.loginPassword_;
  }
  set loginPassword(val: string) {
    this.loginPassword_ = val;
  }
  
  get isLoggedIn(): boolean {
    return this.isLoggedIn_;
  }
  set isLoggedIn(val: boolean) {
    this.isLoggedIn_ = val;
  }
  
  
  get availableRooms(): ChatRoom[] {
    return this.availableRooms_;
  }
  set availableRooms(val: ChatRoom[]) {
    this.availableRooms_ = val;
  }
  
  get registerUsername(): string {
    return this.registerUsername_;
  }
  set registerUsername(val: string) {
    this.registerUsername_ = val;
  }
  
  get registerPassword(): string {
    return this.registerPassword_;
  }
  set registerPassword(val: string) {
    this.registerPassword_ = val;
  }
  
  get registerPasswordRepeat(): string {
    return this.registerPasswordRepeat_;
  }
  set registerPasswordRepeat(val: string) {
    this.registerPasswordRepeat_ = val;
  }
  
  sendNewContactSearch() {
    this.http.get(this.constants.BASE_URL + "/userId/1337/users/" + this.searchNewContactInputText).subscribe(response => {
      this.newContactsList = <Contact[]>response;
    })
  }

  sendRequestRegistration() {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    this.http
    .post(this.constants.BASE_URL + "/register", { username: this.registerUsername, password: this.registerPassword }, { headers })
    .subscribe(response => {
      this.localUser = <User>response;
      this.isLoggedIn = true;
      console.log(this.localUser);
    });
  }
  
  sendRequestLogin() {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    this.http
    .post(this.constants.BASE_URL + "/login", { username: this.loginUsername, password: this.loginPassword }, { headers })
    .subscribe(response => {
        const receivedUser = <User>response;
        if (receivedUser.id && receivedUser.name) {
          this.isLoggedIn = true;
          this.localUser = receivedUser;
          this.init();
        }
      });
  }

  init() {
    this.sendRequestRoomList(this.localUser);
    this.sendRequestContactsList(this.localUser);
  }

  private updateAvailableRooms(chatRooms: ChatRoom[]){
    if (!this.availableRooms) {
      this.availableRooms = [];
    }
    chatRooms.forEach(chatRoom => this.availableRooms.push(chatRoom));
    this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
  }

  private updateContacts(contacts: Contact[]){
    if (!this.availableRooms) {
      this.availableRooms = [];
    }
    contacts.forEach(contact => this.contacts.push(contact));
    this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
  }


  sendRequestContactsList(localUser: User) {
    this.http.get(this.constants.BASE_URL + "/userId/"+localUser.id+"/contacts")
    .subscribe(response => {
      this.updateContacts(<Contact[]> response);
    })
  }

  sendRequestRoomList(localUser: Contact) {
    this.http.get(this.constants.BASE_URL + "/userId/"+localUser.id+"/rooms")
    .subscribe(response => {
      this.updateAvailableRooms(<ChatRoom[]> response);
    })
  }


  /**
   * Post Get kapseln
   */
  sendCreateRoom(contact: Contact, title?: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let transferMessage: TransferMessage = new TransferMessage();
    let chatRoomStub = new ChatRoom();
    chatRoomStub.title = title ? title : contact.name;
    chatRoomStub.userIds = [this.localUser.id, contact.id];
    transferMessage.chatRoom = chatRoomStub;
    this.http
      .post(this.constants.BASE_URL + "/create-room", transferMessage, { headers })
      .subscribe(response => {
        this.updateAvailableRooms(<ChatRoom[]> [response]);
      });
  }

  sendChatMessage() {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient, private constants: Constants) { }
}
