import { Injectable } from '@angular/core';
import { ChatMessage } from './Entities/chat.message';
import { ChatRoom } from './Entities/chat.room';
import { Contact } from './Entities/contact';
import { User } from './Entities/user';


@Injectable({
    providedIn: 'root'
})
export class DataStore {

    private DATA_: Map<string, any> = new Map<string, any>();
    private TEMPDATA_: Map<string, any> = new Map<string, any>();

    // LOGIN AND REGISTRATION PROPERTIES
    private registerUsername_: string;
    private registerPassword_: string;
    private registerPasswordRepeat_: string

    private loginUsername_: string = "default";
    private loginPassword_: string = "123";
    private searchNewContactInputText_: string;
    private newContactsList_: Contact[];

    //LOCAL USER PROPERTIES
    private localUser_: User;
    private isLoggedIn_: boolean = false;

    private allChatMessages_: Map<string, ChatMessage[]> = new Map<string, ChatMessage[]>();
    private availableRooms_: Map<string, ChatRoom> = new Map<string, ChatRoom>();
    private contacts_: Contact[] = [];

    get DATA(): Map<string, any> {
        return this.DATA_;
    }
    set DATA(val: Map<string, any>) {
        this.DATA_ = val;
    }
    get TEMPDATA(): Map<string, any> {
        return this.TEMPDATA_;
    }
    set TEMPDATA(val: Map<string, any>) {
        this.TEMPDATA_ = val;
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

    get isLoggedIn(): boolean {
        return this.isLoggedIn_;
    }
    set isLoggedIn(val: boolean) {
        this.isLoggedIn_ = val;
    }

    get allChatMessages(): Map<string, ChatMessage[]> {
        return this.allChatMessages_;
    }
    set allChatMessages(val: Map<string, ChatMessage[]>) {
        this.allChatMessages_ = val;
    }

    get availableRooms(): Map<string, ChatRoom> {
        return this.availableRooms_;
    }
    set availableRooms(val: Map<string, ChatRoom>) {
        this.availableRooms_ = val;
    }

    get contacts(): Contact[] {
        return this.contacts_;
    }
    set contacts(val: Contact[]) {
        this.contacts_ = val;
    }

    addMapToDATA(dataMap: Map<string, any>) {
        dataMap.forEach((value, key) => this.DATA.set(key, value));
    }

    addEntryToDATA(entry: any) {
        this.DATA.set(entry.id, entry);
    }

    addListOfEntriesToDATA(entries: any[]) {
        entries.forEach(entry => this.addEntryToDATA(entry));
    }

    lookUpInDATA(id: string): any {
        return this.DATA.get(id);
    }

    addMapToTEMPDATA(dataMap: Map<string, any>) {
        dataMap.forEach((value, key) => this.TEMPDATA.set(key, value));
    }

    addEntryToTEMPDATA(entry: any) {
        this.TEMPDATA.set(entry.id, entry);
    }

    addEntryWithouthIdToTEMPDATA(key: string, entry: any) {
        this.TEMPDATA.set(key, entry);
    }

    addListOfEntriesToTEMPDATA(entries: any[]) {
        entries.forEach(entry => this.addEntryToTEMPDATA(entry));
    }

    lookUpInTEMPDATA(id: string): any {
        return this.TEMPDATA.get(id);
    }

    /**
     * returns the chatMessage associated with a given roomId and index.
     * if the passed value for given parameter "index" is -1 the last chatMessage element in the list will be returned
     * if the index is invalid null is returned
     * @param roomId 
     * @param index 
     */
    getChatMessageByRoomIdAndIndex(roomId: string, index: number): ChatMessage {
        let messages = this.getChatMessages(roomId);
        if (index == -1) {
            index = messages.length - 1;
        }

        if (messages && messages.length > index) {
            return messages[index];
        }
        return null;
    }

    getChatMessages(roomId: string) {
        return this.allChatMessages.get(roomId);
    }

    deleteFromTEMPDATA(id: string): any {
        return this.TEMPDATA.get(id);
    }


    resetStore() {
        this.DATA_= new Map<string, any>();
        this.TEMPDATA_= new Map<string, any>();

        // LOGIN AND REGISTRATION PROPERTIES
        this.registerUsername_ = null;;
        this.registerPassword_ = null;
        this.registerPasswordRepeat_ = null;

        this.loginUsername_ = "default";
        this.loginPassword_ = "123";
        this.searchNewContactInputText_ = null;
        this.newContactsList_ = null;

        //LOCAL USER PROPERTIES
        this.localUser = null;;
        this.isLoggedIn_ = false;

        this.allChatMessages_ = new Map<string, ChatMessage[]>();
        this.availableRooms_ = new Map<string, ChatRoom>();
        this.contacts_ = [];
    }

}