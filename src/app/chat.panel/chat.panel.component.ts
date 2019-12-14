import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../Entities/chat.message';
import { User } from '../Entities/user';
import { ChatRoom } from '../Entities/chat.room';
import { Constants } from '../constants';
import { DataStore } from '../data.store';
import { ValueResolver } from '../value.resolver';
import { Contact } from '../Entities/contact';
import { ChatMessageSearchService } from '../chat-message-search.service';
import { EmojiService } from '../emoji.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat.panel.component.html',
  styleUrls: ['./chat.panel.component.css']
})
export class ChatPanelComponent implements OnInit {

  displaySearchInput = false;
  displayRoomMenu: boolean = false;
  currentDisplayedRightPanel_: string = "null";
  searchInputField_ = "";

  get searchInputField() {
    return this.searchInputField_;
  }
  set searchInputField(val: string) {
    // trigger search
    this.searchInputField_ = val;
    if (this.displaySearchInput && val.length >= 2) {
      this.triggerSearch();
    } else {
      this.messageSearch.resetSearch();
    }
  }

  get currentDisplayedRightPanel(): string {
    return this.currentDisplayedRightPanel_;
  }
  set currentDisplayedRightPanel(value: string) {
    this.currentDisplayedRightPanel_ = value;
  }

  get markedMessageCount() {
    return this.messageSearch.markedMessages && this.messageSearch.markedMessages.length > 0 ?
      this.messageSearch.markedMessages.length :
      0;
  }

  get chatInputText(): string {
    return this.chatService.chatInputText;
  }
  set chatInputText(val: string) {
    this.chatService.chatInputText = val;
  }

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  get markedMessageJumpIndex() {
    return this.messageSearch.markedMessageJumpIndex;
  }
  set markedMessageJumpIndex(val: number) {
    this.messageSearch.markedMessageJumpIndex = val;
  }

  get icons(): any[] {
    return this.emojiService.ICONS;
  }

  get iconAliases(): any[] {
    return this.icons.filter(icon => icon['alias']).map(icon => icon['alias']);
  }

  constructor(private emojiService: EmojiService, private chatService: ChatService, private messageSearch: ChatMessageSearchService, private values: ValueResolver, private store: DataStore, private constants: Constants) {
    this.chatService.registerChatPanelComponent(this);
  }

  inputField: HTMLElement;
  ngOnInit() {
    let that = this
    let interval = setInterval(function () {
       that.inputField = <HTMLElement>document.getElementById('input-chat-messages');
      if (that.inputField) {
        that.inputField.addEventListener("keyup", event => that.changeValue(event));
        //Verhindert Zeilenumbruch
        that.inputField.addEventListener("keydown", event => event.keyCode === that.constants.ENTER_KEY ? event.preventDefault() : {});

        clearInterval(interval);
      }
    }, 250); 
  }

  toggleRoomMenuDisplay() {
    this.displayedChatRoom ? this.displayRoomMenu = !this.displayRoomMenu : this.displayRoomMenu = false;
  }

  triggerSendChatMessage() {
    if (this.inputField.innerText && this.inputField.innerText.length >= 0) {
      // console.log(this.displayedChatRoom);
      const chatMessage: ChatMessage = new ChatMessage();
      chatMessage.body = this.inputField.innerText;
      chatMessage.fromId = this.localUser.id;
      chatMessage.roomId = this.displayedChatRoom.id;
      this.chatService.sendOutgoingChatMessage(this.displayedChatRoom.userIds, chatMessage);
      this.inputField.innerHTML = "";
      this.inputField.innerText = "";

    }
  }

  triggerSearch() {
    // localSearch
    this.messageSearch.localSearch(this.searchInputField_);
    if (this.messageSearch.markedMessages.length > 0) {
      // jump to last (in time)
      this.markedMessageJumpIndex = this.messageSearch.markedMessages.length - 1;
      this.scrollToSearchResult(true)
    }
  }

  toggleDisplaySearch() {
    if (this.displaySearchInput) {
      this.searchInputField_ = "";
      this.messageSearch.resetSearch();
      this.displaySearchInput = false;
    } else {
      this.displaySearchInput = true;
    }
  }

  asyncInitContactProfile(contact: Contact) {
    let that = this;
    let interval = setInterval(function () {
      if (that.chatService.contactProfileComponent) {
        that.chatService.contactProfileComponent.init(contact);
        clearInterval(interval);
      }
    }, 5);
  }

  asyncInitEditGroupProfile(chatRoom: ChatRoom, readOnly: boolean) {
    let that = this;
    let interval = setInterval(function () {
      if (that.chatService.editGroupProfileComponent) {
        that.chatService.editGroupProfileComponent.init(chatRoom, readOnly);
        clearInterval(interval);
      }
    }, 5);
  }

  iconCode: string = "&#128523;";

  initDisplayProfile() {
    if (this.displayedChatRoom.groupChat) {
      this.currentDisplayedRightPanel = this.constants.EDIT_GROUP_CHAT_PROFILE;
      this.asyncInitEditGroupProfile(this.displayedChatRoom, false);
      return;
    }

    this.currentDisplayedRightPanel = this.constants.CONTACT_PROFILE;
    let otherContactId: string = this.displayedChatRoom.userIds.filter(id => id != this.localUser.id)[0];
    let otherContact = this.chatService.getContactById(otherContactId);
    this.asyncInitContactProfile(otherContact);
  }

  menuSelect() {
    console.log(this)
    this.displayRoomMenu = !this.displayRoomMenu
  }

  previousResult() {
    let markedMessage: ChatMessage = this.messageSearch.getMarkedMessageByIndex(this.markedMessageJumpIndex);
    markedMessage.highlightedSearchBody = null;
    if (this.markedMessageJumpIndex + 1 < this.markedMessageCount) {
      this.markedMessageJumpIndex += 1;
    } else {
      this.markedMessageJumpIndex = 0;
    }

    this.scrollToSearchResult(true);
  }

  nextResult() {
    let markedMessage: ChatMessage = this.messageSearch.getMarkedMessageByIndex(this.markedMessageJumpIndex);
    markedMessage.highlightedSearchBody = null;
    if (this.markedMessageJumpIndex - 1 >= 0) {
      this.markedMessageJumpIndex -= 1;
    } else {
      this.markedMessageJumpIndex = this.markedMessageCount - 1;
    }

    this.scrollToSearchResult(true);

  }

  scrollToSearchResult(smooth: boolean) {
    let markedMessage: ChatMessage = this.messageSearch.getMarkedMessageByIndex(this.markedMessageJumpIndex);
    markedMessage.highlightedSearchBody = markedMessage.searchBody.replace("searchRes", "searchResHighlight")
    if (markedMessage) {
        this.chatService.scrollIntoView(markedMessage.id, smooth);
    }
  }

  isFocused: boolean = false;

  isClicked() {
    this.isFocused = true;
  }

  focusOut() {
    this.isFocused = false;
  }


  chatTxt: string = "";

  insertIconInChatInputText(icon: any) {
    //textArea.innerHTML += icon.hexCode;
    //this.chatInputText += icon.hexCode;
    this.inputField.innerHTML += icon.hexCode;
  }
  
  get selectionRange(){
    let selection = window.getSelection();
    console.log(selection)
    return 0;
  }
  
  set selectionRange(range: any){
    
  }

  findReplaceEmoticons(event: KeyboardEvent){
    let cursorPosition = event.target;
    this.selectionRange
    for (let aliasList of this.iconAliases) {
      for (let alias of aliasList) {
        if(this.inputField.innerText.includes(alias)){
        let dezCode = this.emojiService.convertEmoji(alias)
          if(dezCode){
            this.inputField.innerHTML = this.inputField.innerText.replace(alias, dezCode)
            break;
          }
        }
      }
    }
  }

  changeValue(event: KeyboardEvent) {
    if(event.keyCode === this.constants.ENTER_KEY) {
      event.preventDefault();
      //console.log( event )
      this.triggerSendChatMessage();
      return;
    }
    this.findReplaceEmoticons(event) 
  }

  EmojiContainerState: boolean = false;

  EmojiContainerOpen() {
    this.EmojiContainerState = true;
  }

  EmojiContainerClose() {
    this.EmojiContainerState = false;
  }

}
