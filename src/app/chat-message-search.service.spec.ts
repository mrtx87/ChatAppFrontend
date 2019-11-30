import { TestBed } from '@angular/core/testing';

import { ChatMessageSearchService } from './chat-message-search.service';

describe('ChatMessageSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatMessageSearchService = TestBed.get(ChatMessageSearchService);
    expect(service).toBeTruthy();
  });
});
