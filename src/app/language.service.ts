import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Language } from './language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  /** */
  LANG_KEYS: string[] = [
    'german',
    'english'
  ];

  private LANGUAGES_: Language[];
  private languageTexts: Map<string, any> = new Map<string, any>();

  private selectedLanguageKey: string = "german";

  constructor(private httpService: HttpClient) {
    this.initAvailableLanguages();
    this.initLanguages();
  }

  get LANGUAGES(){
     return this.LANGUAGES_;
  }

  private initAvailableLanguages(){
    this.LANGUAGES_ = [];
    for (let lang_key of this.LANG_KEYS){
      let iconParam = 'assets/' + lang_key + '-icon.svg';
      let langParam = 'assets/' + lang_key + '.json';
      let lang: Language = new Language(iconParam, langParam, lang_key);
      this.LANGUAGES_.push(lang);
    }

  }

  initLanguages() {
    for (let language of this.LANGUAGES_) {
      this.parseLanguageJson(language.langKey,language.languageJsonUrl);
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
    let selectedTextObj = this.languageTexts.get(this.selectedLanguageKey);
    if(selectedTextObj) {
      let text = selectedTextObj[text_key];
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


  private parseLanguageJson(key: string, jsonUrl: string) {
    let that = this;
    this.httpService.get(jsonUrl).subscribe(langObj => that.addLangObject(key, langObj), (err: HttpErrorResponse) => console.log(err.message));
    //add_new_user --> äquivalent zu this.GERMAN.add_new_user
  }

  public addLangObject(key: string, langObj: any) {
    this.languageTexts.set(key, langObj);
  }

}
