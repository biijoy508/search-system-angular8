import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempelviewComponent } from './exempelview.component';

describe('ExempelviewComponent', () => {
  let component: ExempelviewComponent;
  let fixture: ComponentFixture<ExempelviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExempelviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExempelviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
