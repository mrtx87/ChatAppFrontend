import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { GroupProfileComponent } from './group-profile/group-profile.component';
import { ChatRoomNamePipe } from './chat-room-name.pipe';
import { ContactNamePipe } from './contact-name.pipe';
import { SettingsComponent } from './settings/settings.component';
import { LastestChatMessageBodyPipe } from './lastest-chat-message-body.pipe';
import { LatestChatMessageDatePipe } from './latest-chat-message-date.pipe';
import { ImgPipe } from './img.pipe';
import { CookieService } from 'ngx-cookie-service';
import { LanguagePipe } from './language.pipe'
import { ContactProfileComponent } from './contact-profile/contact-profile.component'

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
    SearchresultComponent,
    GroupProfileComponent,
    ChatRoomNamePipe,
    ContactNamePipe,
    SettingsComponent,
    LastestChatMessageBodyPipe,
    LatestChatMessageDatePipe,
    ImgPipe,
    LanguagePipe,
    ContactProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule


  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
