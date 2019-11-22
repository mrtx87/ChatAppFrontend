import { TestBed } from '@angular/core/testing';

import { EmojiserviceService } from './emojiservice.service';

describe('EmojiserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmojiserviceService = TestBed.get(EmojiserviceService);
    expect(service).toBeTruthy();
  });
});
