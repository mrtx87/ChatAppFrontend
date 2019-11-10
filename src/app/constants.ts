import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants{
    public BASEURI : string =  "http://localhost:8080"; //"http://chatapplicationsection9.herokuapp.com";
    public BASE_URL : string = "http://localhost:8080/data";  //"http://chatapplicationsection9.herokuapp.com/data";

    public WS_BASE_URL : string = "/app/send";
    public DISPLAY_CONTACTS_PANEL : string = "displaycontacts-panel";
    public ADD_USER_PANEL : string = "adduser-panel";
    public GROUP_CHAT : string = "group-chat";
    public GROUP_CHAT_PROFILE : string = "group-chat-profile";
    public USER_PROFILE : string = "user-profile";
    

    public NEW_GROUP_IMAGE: string = "new-group-image";
    public NEW_LOCAL_USER_IMAGE: string = "new-local-user-image";



    public DEFAULT_PANEL : string = "default-panel";

    public CHAT_MESSAGE_DATE_TYPE : string = "DATE";
    public CHAT_MESSAGE_SYSTEM_TYPE: string = "System";

    public TM_TYPE_CHAT_MESSAGE: string = 'chat-message';

    public CREATING_ROOM_CONTACTS_ID: string = "creating-room-contacts";
    public DISPLAYED_ROOM_ID: string = "displayed-room-id";
    public DISPLAYED_USER_ID: string = "displayed-user-id";

}