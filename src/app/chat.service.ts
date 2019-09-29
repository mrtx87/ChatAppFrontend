import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { ChatRoom } from './Entities/chat.room';
import { AppComponent } from './app.component';
import { Contact } from './Entities/contact';
import { User } from './Entities/user';
import { TransferMessage } from './Entities/transfer.message';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChatMessage } from './Entities/chat.message';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  ws: SockJS;
  private stompClient;

  // LOGIN AND REGISTRATION PROPERTIES
  private registerUsername_: string;
  private registerPassword_: string;
  private registerPasswordRepeat_: string

  private loginUsername_: string = "default";
  private loginPassword_: string = "123";
  private searchNewContactInputText_: string;
  private newContactsList_: Contact[];

  //FORMS AND PAGE INPUTS
  private chatInputText_: string;


  public appComponent: AppComponent;
  public registerAppComponent(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  //DISPLAY PARAMETERS
  private displayedChatRoom_: ChatRoom;

  //LOCAL USER PROPERTIES
  private localUser_: User;
  private isLoggedIn_: boolean = false;

  private chatMessagesByRoom_: Map<string, ChatMessage[]> = new Map<string, ChatMessage[]>();

  //DEBUG MOCKS

  private availableRooms_: Map<string, ChatRoom> = new Map<string, ChatRoom>();
  private contacts_: Contact[] = [];

  get chatMessagesByRoom(): Map<string, ChatMessage[]> {
    return this.chatMessagesByRoom_;
  }
  set chatMessagesByRoom(val: Map<string, ChatMessage[]>) {
    this.chatMessagesByRoom_ = val;
  }

  get displayedChatRoom(): ChatRoom {
    return this.displayedChatRoom_;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.displayedChatRoom_ = val;
  }

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


  get availableRooms(): Map<string, ChatRoom> {
    return this.availableRooms_;
  }
  set availableRooms(val: Map<string, ChatRoom>) {
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

  connect() {
    this.ws = new SockJS("http://localhost:8080/socket");
    this.stompClient = Stomp.over(this.ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.sendOwnOnlineStatus();
      that.stompClient.subscribe("/client/" + that.localUser.id, messageFromServer =>
        that.handleServerResponse(JSON.parse(messageFromServer.body))
      );
    });
  }

  handleServerResponse(transferMessage: TransferMessage) {
    switch (transferMessage.function) {

      case 'chat-message': {
        this.chatMessagesByRoom.get(transferMessage.chatMessage.roomId).push(transferMessage.chatMessage);
      } break;

    }

  }

  localCloseConnection() {
    this.stompClient.disconnect();
    this.ws.close();
  }

  sendOwnOnlineStatus() {
    this.stompClient.send(
      "/app/send/online-status",
      {},
      JSON.stringify({ from: <Contact>this.localUser })
    );
  }

  sendDisconnectMessage(user: Contact) {
    this.stompClient.send(
      "/app/send/disconnect-client",
      {},
      JSON.stringify({ from: user })
    );
  }

  sendNewContactSearch() {
    this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/users/" + this.searchNewContactInputText).subscribe(response => {
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
    this.connect();
    this.sendRequestRoomList(this.localUser);
    //this.sendRequestContactsList(this.localUser);
  }

  private updateAvailableRooms(chatRooms: ChatRoom[]) {
    if (!this.availableRooms) {
      this.availableRooms = new Map<string, ChatRoom>();
    }
    chatRooms.forEach(chatRoom => this.availableRooms.set(chatRoom.id, chatRoom));
    this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;

    chatRooms.forEach(chatRoom => this.sendRequestChatMessages(chatRoom.id));
  }

  private sendRequestChatMessages(roomId: string) {
    this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/roomId/" + roomId).subscribe(response => {
      // TODO
      this.chatMessagesByRoom.set(roomId, <ChatMessage[]>response);
      this.availableRooms.get(roomId).unseenChatMessageIds = this.countUnseenMessages(roomId);
    })
  }

  private countUnseenMessages(roomId: string): string[] {
    let unseenMessageIds: string[] = [];
    for (let chatMessage of this.chatMessagesByRoom.get(roomId)) {
      if (!chatMessage.seen) {
        unseenMessageIds.push(chatMessage.id);
      }
    }
    return unseenMessageIds;
  }

  private updateContacts(contacts: Contact[]) {
    if (!this.contacts) {
      this.contacts = [];
    }
    contacts.forEach(contact => this.contacts.push(contact));
    this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
  }


  sendRequestContactsList(localUser: User) {
    this.http.get(this.constants.BASE_URL + "/userId/" + localUser.id + "/contacts")
      .subscribe(response => {
        this.updateContacts(<Contact[]>response);
      })
  }

  sendRequestRoomList(localUser: Contact) {
    this.http.get(this.constants.BASE_URL + "/userId/" + localUser.id + "/rooms")
      .subscribe(response => {
        this.updateAvailableRooms(<ChatRoom[]>response);
      })
  }

  sendUpdateSeenMessages(unseenChatMessageIds: string[]) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let transferMessage: TransferMessage = new TransferMessage();
    transferMessage.unseenChatMessageIds = unseenChatMessageIds;
    transferMessage.from = <Contact> this.localUser;
    this.http
      .post(this.constants.BASE_URL + "/update-unseen-messages", transferMessage, { headers })
      .subscribe(response => {
          console.log()
      });
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
        this.updateAvailableRooms(<ChatRoom[]>[response]);

        this.displayedChatRoom = <ChatRoom>response;
      });
  }

  sendOutgoingChatMessage(chatRoom: ChatRoom, chatMessage: ChatMessage) {
    this.stompClient.send(
      "/app/send/chat-message",
      {},
      JSON.stringify({ from: <Contact>this.localUser, chatRoom: chatRoom, chatMessage: chatMessage })
    );
  }

  constructor(private http: HttpClient, private constants: Constants) { }
}
