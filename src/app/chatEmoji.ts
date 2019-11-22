export class ChatEmoji {


  emojiCode :string;
  emojiName :string;

  getEmojiName() : string {
    return this.emojiName;
  }

  getEmojiCode() : string {
    return this.emojiCode;
  }

  setEmojiName(value: string) {
    this.emojiName = value;
  }

  setEmojiCode(value: string) {
    this.emojiCode = value;


  }


  constructor(emojiN: string, emojiC: string) {
    this.emojiCode = emojiC;
    this.emojiName = emojiN;
  }

}
