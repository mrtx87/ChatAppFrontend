import { stringify } from 'querystring';

export class Language {

    iconUrl_: string;
    language_: any;
    langKey_: string;


    constructor(iconUrl: string, languageJsonUrl: any, langKey: string) {
        this.iconUrl = iconUrl;
        this.languageJsonUrl = languageJsonUrl;
        this.langKey = langKey;
    }

    set langKey(val: string) {
        this.langKey_ = val;
    }

    get langKey() {
        return this.langKey_;
    }

    set iconUrl(val: string){
        this.iconUrl_ = val;
    }
    get iconUrl(){
        return this.iconUrl_;
    }

    set languageJsonUrl(val: any){
        this.language_ = val;
    }
    get languageJsonUrl(){
        return this.language_;
    }
}