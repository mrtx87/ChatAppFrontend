import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  /** */
  LANG_KEYS: string[] = [
    'german',
    'english'
  ];
  languageTexts: Map<string, any> = new Map<string, any>();

  availableLanguages: string[] = [];
  selectedLanguageKey: string = "german";

  constructor(private httpService: HttpClient) {

    this.initLanguages();
  }

  //TODO Alle Sprachen dynamisch einlesen und in languageTexts ablegen mit Hilfe von parseLanguageJson DONE
  initLanguages() {
    for (let key of this.LANG_KEYS) {
      this.parseLanguageJson(key);
    }
  }

  //TODO Function Löst einen text_key zu einem konkreten Text der selektierten Sprache auf DONE
  resolveText(text_key: string) : string {
    //TODO Fehlerbehandlung
    if (this.languageTexts) {
      return this.keyToText(text_key);
    }
    return text_key;
  }

  private keyToText(text_key: string) : string {
    let selectedLangObj = this.languageTexts.get(this.selectedLanguageKey);
    if(selectedLangObj) {
      let text = selectedLangObj[text_key];
       if(text){
          return text;
       }
    }
    return text_key;
  }

  //TODO Aktuell ausgewählte Sprache änderen changeCurrentLanguage(key: newLang)

  //TODO IN HTML Display all Languages as Text or Icon 

  //TODO IN HTML switch the currentLanguage to the language of the clicked icon 


  switchSelectedLanguage(langKey : string ) {
      this.selectedLanguageKey = langKey;
  }


  private parseLanguageJson(key: string) {
    let that = this
    this.httpService.get('assets/' + key + '.json').subscribe(data => that.saveLangText(key, data), (err: HttpErrorResponse) => console.log(err.message));
    //add_new_user --> äquivalent zu this.GERMAN.add_new_user
  }

  public saveLangText(key: string, langObj: any) {
    this.languageTexts.set(key, langObj)
  }

}
