import { Injectable } from '@angular/core';
import { ChatMessage } from './Entities/chat.message';
import { ChatRoom } from './Entities/chat.room';
import { Contact } from './Entities/contact';
import { User } from './Entities/user';


@Injectable({
    providedIn: 'root'
})
export class DataStore {



    private DATA_ : Map<string, any> = new Map<string, any>();
    private TEMPDATA_ : Map<string, any> = new Map<string, any>();

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

    private chatMessagesByRoom_: Map<string, ChatMessage[]> = new Map<string, ChatMessage[]>();
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

    get chatMessagesByRoom(): Map<string, ChatMessage[]> {
        return this.chatMessagesByRoom_;
    }
    set chatMessagesByRoom(val: Map<string, ChatMessage[]>) {
        this.chatMessagesByRoom_ = val;
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

    addMapToDATA(dataMap : Map<string,any>) {
        dataMap.forEach((value, key) => this.DATA.set(value, key));
    }

    addEntryToDATA(entry : any) {
        this.DATA.set(entry.id, entry);
    }

    addListOfEntriesToDATA(entries : any[]) {
        entries.forEach(entry => this.addEntryToDATA(entry));
    }

    lookUpInDATA(id: string): any {
        return this.DATA.get(id);
    }

    addMapToTEMPDATA(dataMap : Map<string,any>) {
        dataMap.forEach((value, key) => this.TEMPDATA.set(value, key));
    }

    addEntryToTEMPDATA(entry : any) {
        this.TEMPDATA.set(entry.id, entry);
    }

    addEntryWithouthKeyToTEMPDATA(key: string, entry : any) {
        this.TEMPDATA.set(entry.id, entry);
    }

    addListOfEntriesToTEMPDATA(entries : any[]) {
        entries.forEach(entry => this.addEntryToTEMPDATA(entry));
    }

    lookUpInTEMPDATA(id: string): any {
        return this.TEMPDATA.get(id);
    }

}