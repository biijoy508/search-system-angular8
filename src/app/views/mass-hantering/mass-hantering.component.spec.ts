import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassHanteringComponent } from './mass-hantering.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MassHanteringComponent', () => {
  let component: MassHanteringComponent;
  let fixture: ComponentFixture<MassHanteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MassHanteringComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassHanteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
