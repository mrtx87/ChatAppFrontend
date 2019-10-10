import { Injectable } from '@angular/core';
import { DataStore } from './data.store';
import { ChatService } from './chat.service';
import { ValueResolver } from './value.resolver';
import { Constants } from './constants';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private store: DataStore, private chatService: ChatService, private values: ValueResolver,private  constants: Constants) { }


  imgsrc;
  onFileChanged(event, key: string) {
    const file = event.target.files[0]

    // Create a file reader
    let reader = new FileReader();
    let that = this;
    // Set the image once loaded into file reader
    reader.onload = function (e) {
      let res : any = e.target;
      that.downscaleImage(res.result, 100, "image/jpeg", 0.7, key);
    }
    // Load files into file reader
    reader.readAsDataURL(file);
  }

  downscaleImage(dataUrl, size, imageType, imageArguments, key: string) {
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
        that.store.addEntryWithouthIdToTEMPDATA(key, newDataUrl);
    }
  }


}
