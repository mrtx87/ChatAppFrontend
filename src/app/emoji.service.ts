import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IconService {


  private ICONS_: any[];

  get ICONS(): any[] {
    return this.ICONS_;
  }

  set ICONS(val: any[]) {
    this.ICONS_ = val;
  }

  constructor(private httpService: HttpClient) {
    this.parseIconsJson("assets/icons.json");
  }

  private parseIconsJson(jsonUrl: string) {
    let that = this;
    this.httpService.get(jsonUrl).subscribe(
      iconsObj => { 
        that.ICONS = <any[]>iconsObj //:-) :)
        //console.log(that.ICONS);
      },
      (err: HttpErrorResponse) => console.log(err.message)
      );
    //add_new_user --> äquivalent zu this.GERMAN.add_new_user
  }

  public convertEmoji(input: string, trait: string = "dezCode") {
    for (let icon of this.ICONS) {
      if(icon["alias"] && icon["alias"].indexOf(input) !== -1){
        return icon[trait];
      }
    }
    return false;
  }
}
