import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaychatComponent } from './displaychat.component';

describe('DisplaychatComponent', () => {
  let component: DisplaychatComponent;
  let fixture: ComponentFixture<DisplaychatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaychatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
