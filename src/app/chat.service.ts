import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { Chatroom } from './Entities/chatroom';
import { User } from './Entities/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  // LOGIN AND REGISTRATION PROPERTIES
  private registerUsername_: string;
  private registerPassword_: string;
  private registerPasswordRepeat_: string

  private loginUsername_: string;
  private loginPassword_ : string;

  



  //LOCAL USER PROPERTIES
  private localUser_: User;
  private isLoggedIn_: boolean = false;

  //DEBUG MOCKS

  chatroom1: Chatroom = Chatroom.createRandom();
  private availableRooms_: Chatroom[] = [this.chatroom1] //MOCK

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


  get availableRooms(): Chatroom[] {
    return this.availableRooms_;
  }
  set availableRooms(val: Chatroom[]) {
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

  sendRequestRegistration() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    this.http
      .post(Constants.BASE_URL + "/register", { username: this.registerUsername, password: this.registerPassword }, { headers })
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
      .post(Constants.BASE_URL + "/login", { username: this.loginUsername, password: this.loginPassword }, { headers })
      .subscribe(response => {
        this.localUser = <User>response;
        this.isLoggedIn = true;
        console.log(this.localUser);
      });  }


  constructor(private http: HttpClient) { }
}
