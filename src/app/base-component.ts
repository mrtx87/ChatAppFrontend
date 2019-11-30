export class BaseComponent {

    ID_: string;

    get ID(): string {
        return this.ID_
    }

    set ID(value: string) {
        this.ID_ = value;
    }

    constructor() {
    }

    private initRandomComponentID() {
        this.ID = Date.now()  + this.genLetter() + this.genLetter()+ this.genLetter() + this.genLetter() ;
    }

    private genLetter() : string {
        return String.fromCharCode(Math.round(Math.random() * 25) + 65);
    }


}