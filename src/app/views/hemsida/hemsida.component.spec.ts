import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemsidaComponent } from './hemsida.component';

describe('HemsidaComponent', () => {
  let component: HemsidaComponent;
  let fixture: ComponentFixture<HemsidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HemsidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HemsidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
