import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chat.PanelComponent } from './chat.panel.component';

describe('Chat.PanelComponent', () => {
  let component: Chat.PanelComponent;
  let fixture: ComponentFixture<Chat.PanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chat.PanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chat.PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
