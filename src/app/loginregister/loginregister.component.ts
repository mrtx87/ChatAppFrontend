import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { DataStore } from '../data.store';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent implements OnInit {

  registrationValid: boolean = true;
  isRegistering: boolean = false;
  displayRegistration: boolean = false;

  private isLoggingIn_ : boolean = false;

  get isLoggingIn(): boolean {
    return this.isLoggingIn_;
  }
  set isLoggingIn(val: boolean) {
    this.isLoggingIn_ = val;
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

  constructor(private chatService: ChatService, private store: DataStore) {
    chatService.registerLoginRegisterComponent(this);
   }

  ngOnInit() {
    
  }

  requestRegistration() {
    if (this.registerPassword != "" && this.registerPassword === this.registerPasswordRepeat) {
      this.isRegistering = true;
      this.chatService.sendRequestRegistration();
      this.registerPassword = "";
      this.registerPasswordRepeat = this.registerPassword;
      this.registerUsername = this.registerPassword;
      this.registrationValid = true;
    }else{
      this.registrationValid = false;
      this.isRegistering = false;
    }
  }

  requestLogin() {
    if (this.loginPassword != "" && this.loginUsername != "") {
      this.chatService.sendRequestLogin();
      this.loginPassword = "";
      this.loginUsername = this.registerPassword;
    }

  }

}
