import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgroupchatComponent } from './addgroupchat.component';

describe('AddgroupchatComponent', () => {
  let component: AddgroupchatComponent;
  let fixture: ComponentFixture<AddgroupchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgroupchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgroupchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
