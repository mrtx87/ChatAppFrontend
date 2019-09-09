import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent implements OnInit {

  registrationValid: boolean = true;
  isRegistering: boolean = false;
  displayRegistration: boolean = false;


  get loginUsername(): string {
    return this.chatService.loginUsername;
  }
  set loginUsername(val: string) {
    this.chatService.loginUsername = val;
  }

  get loginPassword(): string {
    return this.chatService.loginPassword;
  }
  set loginPassword(val: string) {
    this.chatService.loginPassword = val;
  }


  get isLoggedIn(): boolean {
    return this.chatService.isLoggedIn;
  }
  set isLoggedIn(val: boolean) {
    this.chatService.isLoggedIn = val;
  }

  get registerUsername(): string {
    return this.chatService.registerUsername;
  }
  set registerUsername(val: string) {
    this.chatService.registerUsername = val;
  }

  get registerPassword(): string {
    return this.chatService.registerPassword;
  }
  set registerPassword(val: string) {
    this.chatService.registerPassword = val;
  }

  get registerPasswordRepeat(): string {
    return this.chatService.registerPasswordRepeat;
  }
  set registerPasswordRepeat(val: string) {
    this.chatService.registerPasswordRepeat = val;
  }


  constructor(private chatService: ChatService) { }

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
