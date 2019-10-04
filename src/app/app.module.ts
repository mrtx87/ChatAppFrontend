import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left.panel/left.panel.component';
import { ChatPanelComponent } from './chat.panel/chat.panel.component';
import { DisplaychatComponent } from './displaychat/displaychat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatService } from './chat.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddgroupchatComponent } from './addgroupchat/addgroupchat.component';
import { SearchresultComponent } from './searchresult/searchresult.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    ChatPanelComponent,
    DisplaychatComponent,
    ContactsComponent,
    ProfileComponent,
    LoginregisterComponent,
    AdduserComponent,
    AddgroupchatComponent,
    SearchresultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule      


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
