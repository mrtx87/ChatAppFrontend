import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants{

    //COMPONENT IDS
    public ADD_USER_PANEL : string = "adduser-panel";
    public ADD_GROUP_CHAT : string = "add-group-chat";
    public GROUP_CHAT_PROFILE : string = "new-group-chat-profile";
    public EDIT_GROUP_CHAT_PROFILE : string = "edit-group-chat-profile";
    public USER_PROFILE : string = "user-profile";
    public APP_COMPONENT : string = "app-component";
    public CONTACTS_COMPONENT: string = "contacts-component";




    public BASEURI : string =  "http://localhost:8080"; //"http://chatapplicationsection9.herokuapp.com";
    public BASE_URL : string = "http://localhost:8080/data";  //"http://chatapplicationsection9.herokuapp.com/data";
    public WS_BASE_URL : string = "/app/send";


    // settings
    public USER_SETTINGS : string ="user_settings"
    
    public CONTACT_PROFILE : string = "contact-profile";

    public NEW_GROUP_IMAGE: string = "new-group-image";
    public NEW_LOCAL_USER_IMAGE: string = "new-local-user-image";



    public DEFAULT_PANEL : string = "default-panel";

    public CHAT_MESSAGE_DATE_TYPE : string = "DATE";
    public CHAT_MESSAGE_SYSTEM_TYPE: string = "System";

    // TransferMessage Types
    public TM_TYPE_CHAT_MESSAGE: string = 'chat-message';
    public TM_TYPE_UPDATE_ROOMS_AND_CONTACTS: string = 'update-rooms-and-contacts';
    public TM_FUNCTION_LOGIN_AND_COOKIE: string = "login-and-cookie";

    public CREATING_ROOM_CONTACTS_ID: string = "creating-room-contacts";
    public DISPLAYED_ROOM_ID: string = "displayed-room-id";
    public DISPLAYED_USER_ID: string = "displayed-user-id";

    //COOKIE STUFF
    public USER_COOKIE_KEY: string = "S9_CA_U";


    //SEARCH STUFF

    MARK_OPEN : string = "<span class=\"test\">"
    MARK_CLOSE : string = "</span>"

    //KEYCODES

    public ENTER_KEY : number = 13;
}