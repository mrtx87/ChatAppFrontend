import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants{
    public BASE_URL : string = "http://localhost:8080/data";

    public WS_BASE_URL : string = "/app/send";
    public DISPLAY_CONTACTS_PANEL : string = "displaycontacts-panel";
    public ADD_USER_PANEL : string = "adduser-panel";

    public DEFAULT_PANEL : string = "default-panel";

    public CHAT_MESSAGE_DATE_TYPE : string = "DATE";
    public CHAT_MESSAGE_SYSTEM_TYPE: string = "System";

}