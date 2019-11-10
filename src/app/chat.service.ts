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
import * as moment from 'moment';
import { DataStore } from './data.store';
import { GroupProfileComponent } from './group-profile/group-profile.component';
import { AddgroupchatComponent as AddGroupChatComponent } from './addgroupchat/addgroupchat.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ChatPanelComponent } from './chat.panel/chat.panel.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DisplaychatComponent } from './displaychat/displaychat.component';
import { LeftPanelComponent } from './left.panel/left.panel.component';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { SettingsComponent } from './settings/settings.component';




@Injectable({
  providedIn: 'root'
})
export class ChatService {

  ws: SockJS;
  private stompClient;


  //FORMS AND PAGE INPUTS
  private chatInputText_: string;

  //DISPLAY PARAMETERS
  private displayedChatRoom_: ChatRoom;

  set currentDisplayedLeftPanel(value: string) {
    this.appComponent.currentDisplayedLeftPanel = value;
  }

  get currentDisplayedLeftPanel(): string {
    return this.appComponent.currentDisplayedLeftPanel;
  }

  // REGISTERABLE COMPONENTS
  public appComponent: AppComponent;
  public groupProfileComponent: GroupProfileComponent;
  public addGroupChatComponent: AddGroupChatComponent;
  public adduserComponent: AdduserComponent;
  public chatPanelComponent: ChatPanelComponent;
  public contactsComponent: ContactsComponent;
  public displayChatComponent: DisplaychatComponent;
  public lefPanelComponent: LeftPanelComponent;
  public loginRegisterComponent: LoginregisterComponent;
  public profileComponent: ProfileComponent;
  public searchResultComponent: SearchresultComponent
  public settingsComponent: SettingsComponent



  public registerAppComponent(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  public registerGroupProfileComponent(groupProfileComponent: GroupProfileComponent) {
    this.groupProfileComponent = groupProfileComponent;
  }

  public registerAddgroupchatComponent(addGroupChatComponent: AddGroupChatComponent) {
    this.addGroupChatComponent = addGroupChatComponent;
  }

  public registerAdduserComponent(adduserComponent: AdduserComponent) {
    this.adduserComponent = adduserComponent;
  }

  public registerChatPanelComponent(chatPanelComponent: ChatPanelComponent) {
    this.chatPanelComponent = chatPanelComponent;
  }

  public registerLeftPanelComponent(lefPanelComponent: LeftPanelComponent) {
    this.lefPanelComponent = lefPanelComponent;
  }

  public registerLoginRegisterComponent(loginRegisterComponent: LoginregisterComponent) {
    this.loginRegisterComponent = loginRegisterComponent;
  }

  public registerProfileComponent(profileComponent: ProfileComponent) {
    this.profileComponent = profileComponent;
  }

  public registerContactsComponent(contactsComponent: ContactsComponent) {
    this.contactsComponent = contactsComponent;
  }

  public registerDisplayChatComponent(displayChatComponent: DisplaychatComponent) {
    this.displayChatComponent = displayChatComponent;
  }

  public registerSearchResultComponent(searchResultComponent: SearchresultComponent) {
    this.searchResultComponent = searchResultComponent;
  }

  public registerSettingsComponent(settingsComponent: SettingsComponent) {
    this.settingsComponent = settingsComponent;
  }

  get chatMessagesByRoom(): Map<string, ChatMessage[]> {
    return this.store.allChatMessages;
  }
  set chatMessagesByRoom(val: Map<string, ChatMessage[]>) {
    this.chatMessagesByRoom = val;
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
    return this.store.contacts;
  }
  set contacts(val: Contact[]) {
    this.store.contacts = val;
  }

  get newContactsList(): Contact[] {
    return this.store.newContactsList;
  }
  set newContactsList(val: Contact[]) {
    this.store.newContactsList = val;
  }

  get searchNewContactInputText(): string {
    return this.store.searchNewContactInputText;
  }
  set searchNewContactInputText(val: string) {
    this.store.searchNewContactInputText = val;
  }

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  get loginUsername(): string {
    return this.store.loginUsername;
  }
  set loginUsername(val: string) {
    this.store.loginUsername = val;
  }

  get loginPassword(): string {
    return this.store.loginPassword;
  }
  set loginPassword(val: string) {
    this.store.loginPassword = val;
  }

  get isLoggedIn(): boolean {
    return this.store.isLoggedIn;
  }
  set isLoggedIn(val: boolean) {
    this.store.isLoggedIn = val;
  }

  get availableRooms(): Map<string, ChatRoom> {
    return this.store.availableRooms;
  }
  set availableRooms(val: Map<string, ChatRoom>) {
    this.store.availableRooms = val;
  }

  get registerUsername(): string {
    return this.store.registerUsername;
  }
  set registerUsername(val: string) {
    this.store.registerUsername = val;
  }

  get registerPassword(): string {
    return this.store.registerPassword;
  }
  set registerPassword(val: string) {
    this.store.registerPassword = val;
  }

  get registerPasswordRepeat(): string {
    return this.store.registerPasswordRepeat;
  }
  set registerPasswordRepeat(val: string) {
    this.store.registerPasswordRepeat = val;
  }

  connect() {
    this.ws = new SockJS(this.constants.BASEURI + "/socket");
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

      case this.constants.TM_TYPE_CHAT_MESSAGE: {
        this.processRequestedChatMessages(transferMessage.chatMessage.roomId, [transferMessage.chatMessage])
      } break;
    }
  }

  closeLocalWebsocketConnection() {
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

  sendResolveContactId(contactId: string) {
    this.http.get(this.constants.BASE_URL + "/contactId/" + contactId).subscribe(response => {
      this.store.addEntryToDATA(<Contact>response);
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
          this.localUser = receivedUser;
          this.addEntryToDATA(<Contact>this.localUser);
          this.init();
          this.isLoggedIn = true;

        }
      });
  }

  sendUpdateUserProfile() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    this.http
      .post(this.constants.BASE_URL + "/update/userId/" + this.localUser.id, { from: <Contact>this.localUser }, { headers })
      .subscribe(response => {
        let contact = <Contact>response;
        this.localUser.iconUrl = contact.iconUrl ? contact.iconUrl : this.localUser.iconUrl;
        this.localUser.info = contact.info ? contact.info : this.localUser.info;
        this.localUser.name = contact.name ? contact.name : this.localUser.name;

      });
  }


  init() {
    this.connect();
    this.sendRequestContacts();
    this.sendRequestRoomList();
  }

  private updateAvailableRooms(chatRooms: ChatRoom[]) {
    if (!this.availableRooms) {
      this.availableRooms = new Map<string, ChatRoom>();
    }
    chatRooms.forEach(chatRoom => {
      this.availableRooms.set(chatRoom.id, chatRoom);
    });
    this.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
    //get all chat messages per room from backend
    this.addMapToDATA(this.availableRooms);
    this.sendRequestAllChatMessagesForRooms(chatRooms);
  }

  /**
 * gets all chat messages for all received rooms
 * @param roomId 
 */
  private sendRequestAllChatMessagesForRooms(chatRooms: ChatRoom[]) {
    chatRooms.forEach(chatRoom => this.sendRequestChatMessages(chatRoom.id));
  }

  private addEntryToDATA(entry: any) {
    this.store.addEntryToDATA(entry);
  }

  private addListOfEntriesToDATA(entries: any[]) {
    this.store.addListOfEntriesToDATA(entries);
  }

  private addMapToDATA(dataMap: Map<string, any>) {
    this.store.addMapToDATA(dataMap);
  }

  /**
   * gets all chat messages for a single room from backend
   * @param roomId 
   */
  private sendRequestChatMessages(roomId: string) {
    this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/roomId/" + roomId).subscribe(response => {
      this.processRequestedChatMessages(roomId, <ChatMessage[]>response);
    })
  }

  /**
  * gets all contacts for the logged in user from backend
  * 
  */
  private sendRequestContacts() {
    this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/contacts").subscribe(response => {
      this.updateContacts(<Contact[]>response);
    })
  }

  /**
  * gets all chatrooms for the logged in user from backend
  * 
  */
  sendRequestRoomList() {
    this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/rooms")
      .subscribe(response => {
        this.updateAvailableRooms(<ChatRoom[]>response);
      })
  }

  /**
   * processes the received chatmessages in a way that they can be displayed correclty
   * e.g. insert Date Messages for a correct displaying of Dates in the chatroom
   * @param roomId 
   * @param responseChatMessages 
   */
  private processRequestedChatMessages(roomId: string, responseChatMessages: ChatMessage[]) {
    //create ChatMessages Entry for a room in Map if it's not already existing
    if (!this.chatMessagesByRoom.has(roomId)) {
      this.chatMessagesByRoom.set(roomId, []);
    }

    //filter for incoming messages
    let incomingMessages = responseChatMessages.filter(cm => cm.fromId != this.localUser.id);
    if (incomingMessages && incomingMessages.length > 0) {
      //generate list of unseen messages
      this.updateUnseenMessagesIds(roomId, responseChatMessages);
      if (this.displayedChatRoom && roomId == this.displayedChatRoom.id) {
        this.scrollIntoView(this.store.DATA.get(roomId).oldestUnseenMessage.id);
      }
    } else {
      this.scrollIntoView(responseChatMessages[responseChatMessages.length - 1].id);
    }
    //save responseChatMessages in DATA Store
    this.addListOfEntriesToDATA(responseChatMessages);

    //if chatmessages are associated with the currently displayed room then we updates the seen state instantly
    if (this.displayedChatRoom && roomId === this.displayedChatRoom.id) {
      this.sendUpdateUnseenMessages(this.availableRooms.get(roomId).unseenChatMessageIds);
      this.availableRooms.get(roomId).unseenChatMessageIds = [];
    }

    //if there are no chatMessages for given roomId we generate the inital date message
    let chatMessages: ChatMessage[] = this.chatMessagesByRoom.get(roomId);
    if (chatMessages.length == 0) {
      let initialDateMessage = new ChatMessage();
      initialDateMessage.fromId = this.constants.CHAT_MESSAGE_DATE_TYPE;
      initialDateMessage.createdAt = responseChatMessages[0].createdAt;
      chatMessages.push(initialDateMessage);
    }

    //process received chatmessages and insert date message if needed 
    for (let message of responseChatMessages) {
      if (this.areDaysDifferent(message.createdAt, chatMessages[chatMessages.length - 1].createdAt)) {
        let dateMessage = new ChatMessage();
        dateMessage.seen = true;
        dateMessage.fromId = this.constants.CHAT_MESSAGE_DATE_TYPE;
        dateMessage.createdAt = message.createdAt;
        chatMessages.push(dateMessage);
      }
      chatMessages.push(message);
    }
  }

  /**
   * determines if two given dates as strings have different days 
   * @param previous 
   * @param next 
   */
  private areDaysDifferent(previous: string, next: string): boolean {
    let previousDate: moment.Moment = moment(previous);
    let nextDate = moment(next);
    if (nextDate.dayOfYear() != previousDate.dayOfYear() || nextDate.year() != previousDate.year()) {
      return true;
    }
    return false;
  }

  /**
   * determines which messages are unseen an returns them
   * @param chatMessages 
   */
  private updateUnseenMessagesIds(roomId: string, chatMessages: ChatMessage[]) {
    let chatRoom: ChatRoom = this.availableRooms.get(roomId);
    let hasAlreadyUnseenMessages: boolean = chatRoom.unseenChatMessageIds && chatRoom.unseenChatMessageIds.length > 0 ? true : false;
    if (!hasAlreadyUnseenMessages) {
      chatRoom.unseenChatMessageIds = [];
    }
    let oldestMessage: ChatMessage;

    let unseenMessages: ChatMessage[] = chatMessages.filter(cm => {
      if (!cm.seen) {
        if (!oldestMessage) {
          oldestMessage = cm;
        }
        let current: Date = new Date(cm.createdAt);
        let oldest: Date = new Date(oldestMessage.createdAt);
        if (oldest > current) {
          oldestMessage = cm;
        }

        chatRoom.unseenChatMessageIds.push(cm.id);
        return true;
      }
      return false;
    });

    if (unseenMessages.length > 0) {

      if (!hasAlreadyUnseenMessages) {
        chatRoom.oldestUnseenMessage = oldestMessage;
      }
    }
  }

  /**
   * updates the local contacts and sorts them alphabetically
   * @param contacts 
   */
  private updateContacts(contacts: Contact[]) {
    this.contacts = [];
    contacts
      .sort((c1, c2) => (c1.name > c2.name) ? 1 : -1)
      .forEach(contact => {
        this.contacts.push(contact);
        this.addEntryToDATA(contact);
      });
  }

  /**
   * updates the state of the unseen message of a single room in the backend
   * @param unseenChatMessageIds
   */
  sendUpdateUnseenMessages(unseenChatMessageIds: string[]) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let transferMessage: TransferMessage = new TransferMessage();
    transferMessage.unseenChatMessageIds = unseenChatMessageIds;
    transferMessage.from = <Contact>this.localUser;
    this.http
      .post(this.constants.BASE_URL + "/update-unseen-messages", transferMessage, { headers })
      .subscribe(response => {
        /**
         * currently no response handling
         */
      });
  }

  /**
   * send a request to create a new room with an unkown contact
   * @param contact 
   * @param title 
   */
  sendCreateRoomAndContact(contact: Contact, title?: string) {
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
        this.sendRequestContacts();
        this.displayedChatRoom = <ChatRoom>response;
      });
  }

  /**
   * send a request to create a new room with an unkown contact
   * @param contact 
   * @param title 
   */
  sendCreateGroupRoom(from: Contact, chatroom: ChatRoom) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let transferMessage: TransferMessage = new TransferMessage();
    transferMessage.from = from;
    transferMessage.chatRoom = chatroom;
    this.http
      .post(this.constants.BASE_URL + "/create-room", transferMessage, { headers })
      .subscribe(response => {
        this.updateAvailableRooms(<ChatRoom[]>[response]);
        this.sendRequestContacts();
        this.displayedChatRoom = <ChatRoom>response;
      });
  }

  /**
   * sends the currently typed message
   * @param chatRoom 
   * @param chatMessage 
   */
  sendOutgoingChatMessage(chatRoom: ChatRoom, chatMessage: ChatMessage) {
    this.stompClient.send(
      "/app/send/chat-message",
      {},
      JSON.stringify({ from: <Contact>this.localUser, chatRoom: chatRoom, chatMessage: chatMessage })
    );
  }

  scrollIntoView(elementId: string, scrollConfig?: any) {
    let threadId = setInterval(
      function () {
        let element: HTMLElement = document.getElementById(elementId);
        if (element) {
          //let scrollConfig = { behavior: "smooth"};
          element.scrollIntoView();
          clearInterval(threadId);
        }
      }, 50);
  }

  initDisplayChatRoomProfileComponent() {
    if (this.groupProfileComponent) {
      this.groupProfileComponent.init();
    }
  }

  constructor(private http: HttpClient, private constants: Constants, private store: DataStore) { }
}
