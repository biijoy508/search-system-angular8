import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArendesidaComponent } from './arendesida.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ArendesidaComponent', () => {
  let component: ArendesidaComponent;
  let fixture: ComponentFixture<ArendesidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArendesidaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ArendesidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
