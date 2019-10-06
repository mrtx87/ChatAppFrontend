import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../Entities/chat.room';
import { ChatMessage } from '../Entities/chat.message';
import { User } from '../Entities/user';
import { TouchSequence } from 'selenium-webdriver';
import { Constants } from '../constants';
import { DataStore } from '../data.store';

@Component({
  selector: 'app-displaychat',
  templateUrl: './displaychat.component.html',
  styleUrls: ['./displaychat.component.css']
})
export class DisplaychatComponent implements OnInit {

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



  get currentDisplayMessages(): ChatMessage[] {
    if (this.chatService.chatMessagesByRoom && this.displayedChatRoom) {
      return this.chatService.chatMessagesByRoom.get(this.displayedChatRoom.id);
    }
    return [];
  }


  imgsrc;
  img;
  onFileChanged(event) {
    const file = event.target.files[0]

    // Create an image
    this.img = document.createElement("img");
    // Create a file reader
    let reader = new FileReader();
    let that = this;
    // Set the image once loaded into file reader
    reader.onload = function (e) {
      let res : any = e.target;
      that.downscaleImage(res.result, 100, "image/jpeg", 0.7);
    }
    // Load files into file reader
    reader.readAsDataURL(file);

  }

  downscaleImage(dataUrl, size, imageType, imageArguments) {
    let image, canvas, ctx, newDataUrl;

    // Provide default values
    imageType = imageType || "image/jpeg";
    imageArguments = imageArguments || 0.7;

    // Create a temporary image so that we can compute the height of the downscaled image.
    image = new Image();
    image.src = dataUrl;
    let that = this;
    image.onload = function() {
        // Create a temporary canvas to draw the downscaled image on.
        canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        // Draw the downscaled image on the canvas and return the new data URL.
        ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, size, size);
        newDataUrl = canvas.toDataURL(imageType, imageArguments);
        that.imgsrc = newDataUrl;
    }
  }

  constructor(private chatService: ChatService, private constants: Constants, private store: DataStore) { }

  ngOnInit() {
  }




}


