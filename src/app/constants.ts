import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants{
    public BASE_URL : string = "http://localhost:8080/data";

    public WS_BASE_URL : string = "/app/send";
    public DISPLAY_CONTACTS_PANEL : string = "displaycontacts-panel";
    public ADD_USER_PANEL : string = "adduser-panel";
    public GROUP_CHAT : string = "group-chat";
    public GROUP_CHAT_PROFILE : string = "group-chat-profile";



    public DEFAULT_PANEL : string = "default-panel";

    public CHAT_MESSAGE_DATE_TYPE : string = "DATE";
    public CHAT_MESSAGE_SYSTEM_TYPE: string = "System";

    public TM_TYPE_CHAT_MESSAGE: string = 'chat-message';

    public CREATING_ROOM_CONTACTS_ID: string = "creating-room-contacts";
}