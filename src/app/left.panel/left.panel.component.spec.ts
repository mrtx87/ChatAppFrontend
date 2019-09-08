import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Left.PanelComponent } from './left.panel.component';

describe('Left.PanelComponent', () => {
  let component: Left.PanelComponent;
  let fixture: ComponentFixture<Left.PanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Left.PanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Left.PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
