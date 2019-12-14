import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { ChatRoom } from './Entities/chat.room';
import { AppComponent } from './app.component';
import { Contact } from './Entities/contact';
import { User } from './Entities/user';
import { DataTransferContainer } from './Entities/datatransfer.container';
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
import { ValueResolver } from './value.resolver';
import { stringify } from 'querystring';
import { CookieService } from 'ngx-cookie-service';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';
import { ComponentStack } from './component-stack';
import { BaseComponent } from './base-component';
import { EditGroupProfileComponent } from './edit-group-profile/edit-group-profile.component';
import { DatePipe } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class ChatService {


  ws: SockJS;
  private stompClient;

  leftPanelComponentStack_: ComponentStack;

  onlineStatusInterval: any;
  //FORMS AND PAGE INPUTS
  private chatInputText_: string = "";

  //DISPLAY PARAMETERS
  private displayedChatRoom_: ChatRoom;

  get leftPanelComponentStack(): ComponentStack {
    return this.leftPanelComponentStack_;
  }

  set currentDisplayedLeftPanel(value: string) {
    this.appComponent.currentDisplayedLeftPanel = value;
  }

  get currentDisplayedLeftPanel(): string {
    return this.appComponent.currentDisplayedLeftPanel;
  }

  set currentDisplayedRightPanel(value: string) {
    this.chatPanelComponent.currentDisplayedRightPanel = value;
  }

  get currentDisplayedRightPanel(): string {
    return this.chatPanelComponent.currentDisplayedRightPanel;
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
  public searchResultComponent: SearchresultComponent;
  public settingsComponent: SettingsComponent;
  public contactProfileComponent: ContactProfileComponent;
  public editGroupProfileComponent: EditGroupProfileComponent;

  public registerContactProfileComponent(contactProfileComponent: ContactProfileComponent) {
    this.contactProfileComponent = contactProfileComponent;
  }

  public registerEditGroupProfileComponent(editGroupProfileComponent: EditGroupProfileComponent) {
    this.editGroupProfileComponent = editGroupProfileComponent;
  }

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
    this.store.allChatMessages = val;
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

  clearLeftPanelComponentStack() {
    this.leftPanelComponentStack.clear();
  }

  currentComponent(key: string) {
    this.leftPanelComponentStack.push(key);
  }

  previousComponent() {
    return this.leftPanelComponentStack.getPrevious();
  }

  connect() {
    this.ws = new SockJS(this.constants.BASEURI + "/socket");
    this.stompClient = Stomp.over(this.ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.sendRequestLoginFinalization();
      that.stompClient.subscribe("/client/" + that.localUser.id, function (messageFromServer) {
        that.handleServerResponse(JSON.parse(messageFromServer.body));
      }
      );
    });
  }

  handleServerResponse(transferMessage: DataTransferContainer) {
    switch (transferMessage.function) {

      case this.constants.TM_TYPE_CHAT_MESSAGE: {
        this.processRequestedChatMessages(transferMessage.chatRoomId, transferMessage.chatMessages)
      } break;
      case this.constants.TM_TYPE_UPDATE_ROOMS_AND_CONTACTS: {
        this.sendRequestRoomList();
        this.sendRequestContacts();
      } break;
      case this.constants.TM_FUNCTION_LOGIN_AND_COOKIE: {
        this.finalizeLogin(transferMessage);
      } break;
      case this.constants.TM_FUNCTION_CREATE_ROOM_AND_CONTACT: {
        let chatRoom: ChatRoom = <ChatRoom>transferMessage.chatRoom;
        this.addAvailableRoom(chatRoom);
        this.sendRequestInitialChatMessagesForSingleRoom(chatRoom);
        this.sendRequestContacts();
        if (transferMessage.from.id === this.localUser.id) {
          this.displayedChatRoom = chatRoom;
          this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
        }
      } break;
      case this.constants.TM_FUNCTION_CREATE_GROUP_ROOM: {
        let chatRoom: ChatRoom = <ChatRoom>transferMessage.chatRoom;
        this.addAvailableRoom(chatRoom);
        this.sendRequestInitialChatMessagesForSingleRoom(chatRoom);
        if (transferMessage.from.id === this.localUser.id) {
          this.displayedChatRoom = chatRoom;
          this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
        }
      } break;
    }

  }

  finalizeLogin(transferMessage: DataTransferContainer) {

    if (this.localUser.id === transferMessage.from.id) {
      if (transferMessage.cookie) {
        this.cookieService.set(this.constants.USER_COOKIE_KEY, transferMessage.cookie);
      }
      this.isLoggedIn = true;
      this.store.resetLoginAndRegisterVars();
    }

  }

  handleLoginResponse(receivedUser: User) {
    if (receivedUser.id && receivedUser.name) {
      this.localUser = receivedUser;
      this.addEntryToDATA(<Contact>this.localUser);
      this.init();
      return;
    }
    console.log("fehlerhafter login response")
  }

  getContactById(id: string) {
    return this.store.contacts && this.store.contacts.length > 0 ? this.store.contacts.filter(c => c.id === id)[0] : null;
  }

  closeLocalWebsocketConnection() {
    this.stompClient.disconnect();
    this.ws.close();
  }

  sendRequestLoginFinalization() {
    this.stompClient.send(
      "/app/send/login-finalization",
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
        const receivedUser = <User>response;
        this.handleLoginResponse(receivedUser);
      });
  }

  sendRequestLogin() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    this.http
      .post(this.constants.BASE_URL + "/login", { username: this.loginUsername, password: this.loginPassword }, { headers })
      .subscribe(response => {
        const receivedUser = <User>response;
        this.handleLoginResponse(receivedUser);
      });
  }

  sendRequestLoginByCookie(user_cookie: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    this.http
      .post(this.constants.BASE_URL + "/login-by-cookie", { cookie: user_cookie }, { headers })
      .subscribe(response => {
        const receivedUser = <User>response;
        this.handleLoginResponse(receivedUser);
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

  sendUpdateChatRoomProfile(chatRoom: ChatRoom) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    this.http
      .post(this.constants.BASE_URL + "/update/roomId/" + chatRoom.id, { from: <Contact>this.localUser, chatRoom: chatRoom }, { headers })
      .subscribe(response => {
        let chatRoomDTO = <ChatRoom>response;
        chatRoom.iconUrl = chatRoomDTO.iconUrl;
        chatRoom.title = chatRoomDTO.title;
        chatRoom.description = chatRoomDTO.description;
        console.log(response)
      });
  } ///data/online/status/contacts/userId/{userId}




  init() {
    this.connect();
    this.sendRequestContacts();
    this.sendRequestRoomList();
    this.listenForOnlineStatusOfContacts();
  }

  private listenForOnlineStatusOfContacts() {
    let that = this;
    this.onlineStatusInterval = setInterval(
      function () {
        if (!that.isLoggedIn) {
          clearInterval(that.onlineStatusInterval);
          return;
        }
        that.sendRequestContacts();
      }, 10000
    );
  }

  private addAvailableRoom(chatRoom: ChatRoom) {
    if (!this.availableRooms) {
      this.availableRooms = new Map<string, ChatRoom>();
    }
    this.availableRooms.set(chatRoom.id, chatRoom);
    this.addMapToDATA(this.availableRooms);
  }

  private addNewAvailableRoom(chatRoom: ChatRoom) {
    if (!this.availableRooms) {
      this.availableRooms = new Map<string, ChatRoom>();
    }
    this.availableRooms.set(chatRoom.id, chatRoom);
  }

  private updateAvailableRooms(latestChatRooms: ChatRoom[]) {
    if (!this.availableRooms) {
      this.availableRooms = new Map<string, ChatRoom>();
    }
    let nextAvailableRooms: Map<string, ChatRoom> = new Map<string, ChatRoom>();
    latestChatRooms.forEach(chatRoom => {
      if (this.availableRooms.has(chatRoom.id)) {
        let transferRoom = this.availableRooms.get(chatRoom.id);
        transferRoom.iconUrl = chatRoom.iconUrl;
        transferRoom.title = chatRoom.title;
        transferRoom.description = chatRoom.description;
        transferRoom.userIds = chatRoom.userIds;
        nextAvailableRooms.set(transferRoom.id, transferRoom);
      } else {
        nextAvailableRooms.set(chatRoom.id, chatRoom);
      }
    })
    this.availableRooms = nextAvailableRooms;

    if (this.displayedChatRoom && !this.availableRooms.has(this.displayedChatRoom.id)) {
      this.displayedChatRoom = null;
    }
    this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
    //get all chat messages per room from backend
    this.addMapToDATA(this.availableRooms);
    // this.sendRequestAllChatMessagesForRooms(chatRooms);
  }

  sendRequestInitialChatMessages() {
    this.availableRooms.forEach((chatRoom, key) => this.sendRequestInitialChatMessagesForSingleRoom(chatRoom));
  }

  /**
 * gets all chat messages for all received rooms
 * @param roomId 
 */
  // private sendRequestAllChatMessagesForRooms(chatRooms: ChatRoom[]) {
  //   chatRooms.forEach(chatRoom => this.sendRequestChatMessagesForSingleRoom(chatRoom));
  // }

  isPullingMessages: boolean = false;

  /**
 * gets all chat messages for a single room from backend
 * @param roomId 
 */
  public sendRequestChatMessagesBatchForSingleRoom(chatRoom: ChatRoom) {
    if (chatRoom.lastMessageToken) {
      this.isPullingMessages = true;
      this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/roomId/" + chatRoom.id + "/token/" + chatRoom.lastMessageToken).subscribe(response => {
        let messages: ChatMessage[] = <ChatMessage[]>response;
        chatRoom.lastMessageToken = messages && messages.length > 0 && !messages[0].fromId.includes('init') ? messages[0].id : null;
        this.isPullingMessages = false;
        let chatMessages: ChatMessage[] = this.chatMessagesByRoom.get(chatRoom.id);

        /*
        let lastMessage = chatMessages[0];
        if(lastMessage)
        this.scrollIntoView(lastMessage.id, true);*/
        this.processChatMessageBatch(chatRoom.id, messages);
      });
    }
  }

  private processChatMessageBatch(roomId: string, responseChatMessages: ChatMessage[]) {
    //console.log(response);
    let chatMessages: ChatMessage[] = this.chatMessagesByRoom.get(roomId);
    this.displayChatComponent.lastKnowScrollPosition
    this.displayChatComponent.displayChatMessagesContainer.scrollTop += 100;
    this.chatMessagesByRoom.set(roomId, [...responseChatMessages, ...chatMessages]);


    //console.log(newMessages)
  }

  getMedianDateInView(): string {
    if (this.displayedChatRoom) {
      let messagesInView = this.chatMessagesByRoom.get(this.displayedChatRoom.id).filter(m => this.isChatMessageInViewport(m))
      let dates: Map<string, number> = new Map<string, number>();
      for (let messageInView of messagesInView) {
        let key: string = this.datePipe.transform(messageInView.createdAt, 'dd.MM.yyyy');
        if (dates.has(key)) {
          let val = dates.get(key);
          dates.set(key, val + 1);
        } else {
          dates.set(key, 1);
        }
      }

      let date: string;
      let maxOcc = 0;
      dates.forEach((value, key) => {
        if (date) {
          if (maxOcc < value) {
            maxOcc = value;
            date = key;
          }
        } else {
          date = key;
          maxOcc = value;
        }
      })
      return messagesInView && messagesInView.length > 0 ? date : null;
    }
    return null;
  }

  isChatMessageInViewport(chatMessage: ChatMessage): boolean {
    let elem: HTMLElement = document.getElementById(chatMessage.id);
    return elem ? this.isInViewport(elem) : false;
  };

  isInViewport(elem: HTMLElement): boolean {
    let bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  buildDateMessage(createdAt: string): ChatMessage {
    let dateMessage = new ChatMessage();
    dateMessage.seen = true;
    dateMessage.fromId = this.constants.CHAT_MESSAGE_DATE_TYPE;
    dateMessage.createdAt = createdAt;
    return dateMessage;
  }

  /**
* gets all chat messages for a single room from backend
* @param roomId 
*/
  private sendRequestInitialChatMessagesForSingleRoom(chatRoom: ChatRoom) {
    this.http.get(this.constants.BASE_URL + "/inital-messages/userId/" + this.localUser.id + "/roomId/" + chatRoom.id).subscribe(response => {
      let messages: ChatMessage[] = <ChatMessage[]>response;
      chatRoom.lastMessageToken = !messages[0].fromId.includes('init') ? messages[0].id : null;
      this.processRequestedChatMessages(chatRoom.id, <any>response);
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
    //generate list of unseen messages
    this.updateUnseenMessagesIds(roomId, responseChatMessages);

    //filter for incoming messages
    let incomingMessages = responseChatMessages.filter(cm => cm.fromId != this.localUser.id);
    if (incomingMessages && this.displayedChatRoom && incomingMessages.length > 0 && roomId == this.displayedChatRoom.id) {
      //Scroll to oldest unseen
      this.scrollIntoView(this.store.DATA.get(roomId).oldestUnseenMessage.id, false);
    } else {
      //Scroll to latest message
      this.scrollIntoView(responseChatMessages[responseChatMessages.length - 1].id, false);
    }

    //save responseChatMessages in DATA Store
    this.addListOfEntriesToDATA(responseChatMessages);

    //if chatmessages are associated with the currently displayed room then we updates the seen state instantly
    if (this.displayedChatRoom && roomId === this.displayedChatRoom.id) {
      this.sendUpdateUnseenMessages(this.availableRooms.get(roomId).unseenChatMessageIds);
      this.availableRooms.get(roomId).unseenChatMessageIds = [];
    }

    let chatMessages: ChatMessage[] = this.chatMessagesByRoom.get(roomId);
    this.chatMessagesByRoom.set(roomId, [...chatMessages, ...responseChatMessages]);
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
    let hasAlreadyUnseenMessages: boolean = chatRoom.unseenChatMessageIds && chatRoom.unseenChatMessageIds.length > 0;
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
    let transferMessage: DataTransferContainer = new DataTransferContainer();
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
    let transferMessage: DataTransferContainer = new DataTransferContainer();
    let chatRoomStub = new ChatRoom();
    chatRoomStub.groupChat = false;
    chatRoomStub.title = title ? title : contact.name;
    chatRoomStub.userIds = [this.localUser.id, contact.id];
    transferMessage.chatRoom = chatRoomStub;
    transferMessage.from = <Contact>this.localUser;
    /*this.stompClient.send(
      this.constants.WS_BASE_URL+"/create-room",
      {},
      JSON.stringify(transferMessage)
    );*/

    this.http
      .post(this.constants.BASE_URL + "/create-room", transferMessage, { headers })
      .subscribe(response => {
        //this.addAvailableRoom(<ChatRoom>response);
        //this.sendRequestContacts();
        //this.displayedChatRoom = <ChatRoom>response;
        //this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
      });
  }

  /**
   * send a request to create a new room with an unkown contact
   * @param title 
   */
  sendCreateGroupRoom(from: Contact, chatroom: ChatRoom) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let transferMessage: DataTransferContainer = new DataTransferContainer();
    chatroom.groupChat = true;
    transferMessage.chatRoom = chatroom;
    transferMessage.from = <Contact>this.localUser;
    /*this.stompClient.send(
      this.constants.WS_BASE_URL + "/create-room",
      {},
      JSON.stringify(transferMessage)
    );*/

    this.http
      .post(this.constants.BASE_URL + "/create-room", transferMessage, { headers })
      .subscribe(response => {
        //this.addAvailableRoom(<ChatRoom>response);
        //this.sendRequestContacts();
        //this.displayedChatRoom = <ChatRoom>response;
        //this.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
      });
  }
  /**
   * Requests removal of a contact together with its room.
   * @param contactToRemove contact to remove
   */
  sendRemoveContact(conatactToRemove: Contact, chatRoom: ChatRoom) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let transferMessage: DataTransferContainer = new DataTransferContainer();
    transferMessage.from = this.localUser;
    transferMessage.chatRoom = chatRoom;
    this.http
      .post(this.constants.BASE_URL + "/remove-contact", transferMessage, { headers })
      .subscribe(response => {
        this.sendRequestContacts();
        this.sendRequestRoomList();
        this.store.allChatMessages.delete(chatRoom.id);
        this.store.DATA.delete(chatRoom.id);
      });
  }

  /**
   * sends the currently typed message
   * @param chatRoom 
   * @param chatMessage 
   */
  sendOutgoingChatMessage(userIds: string[], chatMessage: ChatMessage) {
    this.stompClient.send(
      "/app/send/chat-message",
      {},
      JSON.stringify({ from: <Contact>this.localUser, unseenChatMessageIds: userIds, chatMessage: chatMessage })
    );
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
  private sendRequestRoomList() {
    let that = this;
    this.http.get(this.constants.BASE_URL + "/userId/" + this.localUser.id + "/rooms")
      .subscribe(response => {
        this.updateAvailableRooms(<ChatRoom[]>response);
        that.sendRequestInitialChatMessages()
      })
  }



  scrollIntoView(elementId: string, smooth: boolean) {
    let scrollWhenReady = setInterval(
      function () {
        let element: HTMLElement = document.getElementById(elementId);
        if (element) {
          //let scrollConfig = { behavior: "smooth"};
          if (smooth) {
            element.scrollIntoView({ behavior: "smooth" });
          } else {
            element.scrollIntoView();
          }
          clearInterval(scrollWhenReady);
        }
      }, 50);
  }

  asyncInitRoomProfile(chatRoom: ChatRoom, readOnly: boolean) {
    let that = this;
    let interval = setInterval(function () {
      if (that.groupProfileComponent) {
        that.groupProfileComponent.init(chatRoom, readOnly);
        clearInterval(interval);
      }
    }, 5);
  }

  resetClient() {
    this.displayedChatRoom = null;
    this.resetChatService();
    this.store.resetStore();
    this.chatPanelComponent.displaySearchInput = false;
    this.loginRegisterComponent.isLoggingIn = false;
    clearInterval(this.onlineStatusInterval);
    this.onlineStatusInterval = null;
  }

  resetChatService() {

  }

  constructor(private datePipe: DatePipe, private http: HttpClient, private constants: Constants, private store: DataStore, private cookieService: CookieService) {
    this.leftPanelComponentStack_ = new ComponentStack();
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


  jumpBack() {
    this.currentDisplayedLeftPanel = this.previousComponent();
  }


  initSlideOut(component: any, duration: number) {
    component.slideOut = true;
    let that = this;

    let interval = setInterval(function () {
      component.intervalTimer += 10;
      if (component.intervalTimer >= duration) {
        that.jumpBack();
        clearInterval(interval);
      }
    }, 10)
  }

}
