import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left.panel/left.panel.component';
import { ChatPanelComponent } from './chat.panel/chat.panel.component';
import { RoomsComponent } from './rooms/rooms.component';
import { DisplaychatComponent } from './displaychat/displaychat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    ChatPanelComponent,
    RoomsComponent,
    DisplaychatComponent,
    ContactsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
