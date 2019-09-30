import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../Entities/chat.room';
import { User } from '../Entities/user';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {


  get availableRooms(): Map<string, ChatRoom> {
    return this.chatService.availableRooms;
  }
  set availableRooms(val: Map<string, ChatRoom>) {
    this.chatService.availableRooms = val;
  }

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  toggleDisplayedRoom(chatRoom: ChatRoom) {
    this.displayedChatRoom = chatRoom;

    this.chatService.sendUpdateSeenMessages(chatRoom.unseenChatMessageIds);
    chatRoom.unseenChatMessageIds = null;
  }


  //Gruppe/Raum mit mehreren Nutzern aus Nutzerliste hinzufügen (nur lokale nutzer)

  // wenn Gruppenmitglieder nicht in der eigenen Kontaktliste dann nur Stub (nur benutzernamen ohne verlinmkung zum proofil)
  // anzeigen

  // eventue

  // Suche in Chatroom Messages bauen, lokale suche und backend-suche
  // springe zum last found matching entry (wenn last found matching entry zu weit weg dann füge
  // nur patch der daten ein) Gedanken machen über übergang und grundsätzliches scroll handling

  // Handling wenn man Scrollt sollen nachrichten nachgeladen werden

  // Parser zum Auflösen aller variablen innerhalb angezeigter Texte

  // Box bauen aus der man Icons auswählen kann
  // eventuell  nach zeichen -> icon map suchen. 
  // das heißt eine datenquelle die für =) das entprechende Icon auflösen kann


  // Bilder einfügbar machen und croppen ( grö0e reduzieren)
  
  // Bilder speichern Gedanken machen z.B. Base64 String in DB, als Blob in DB oder als Datei
  // im DAteisystem

  //Retrieving 100 lastest messages per room.

  //layout für nachrichten an Whatsapp anpassen

  // gedanken machen wie man das Datum vor allen 
  // nachrichten des entsprechenden datums ermitteln und nazeigen kann



}
