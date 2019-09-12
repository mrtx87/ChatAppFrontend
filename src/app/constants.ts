import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants{
    public BASE_URL : string = "http://localhost:8080/data"
    public ADD_USER_PANEL : string = "adduser-panel"
    public DEFAULT_PANEL : string = "default-panel"
}