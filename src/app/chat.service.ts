import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private registerUsername_ : string;
  private registerPassword_ : string;
  
  get registerUsername() : string {
    return this.registerUsername_;
  }
  set registerUsername(val : string){
    this.registerUsername_ = val;
  }
  
  get registerPassword() : string {
    return this.registerPassword_;
  }
  set registerPassword(val : string){
    this.registerPassword_ = val;
  }

  sendRequestRegistration(){
    let that = this;
    const headers = new HttpHeaders()
        .set("Content-Type", "application/json");
    this.http
      .post(Constants.BASE_URL+"/register", {username: that.registerUsername, password: that.registerPassword}, { headers })
      .subscribe(response => {
        console.log(response)
      });
  }

  constructor(private http : HttpClient) { }
}
