import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinmeetingComponent } from './joinmeeting.component';

describe('JoinmeetingComponent', () => {
  let component: JoinmeetingComponent;
  let fixture: ComponentFixture<JoinmeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinmeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
