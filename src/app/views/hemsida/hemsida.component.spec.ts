import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemsidaComponent } from './hemsida.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HemsidaComponent', () => {
  let component: HemsidaComponent;
  let fixture: ComponentFixture<HemsidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HemsidaComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
