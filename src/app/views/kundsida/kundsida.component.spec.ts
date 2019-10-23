import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundsidaComponent } from './kundsida.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('KundsidaComponent', () => {
  let component: KundsidaComponent;
  let fixture: ComponentFixture<KundsidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KundsidaComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundsidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
