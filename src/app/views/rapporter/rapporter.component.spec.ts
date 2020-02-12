import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapporterComponent } from './rapporter.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RapporterComponent', () => {
  let component: RapporterComponent;
  let fixture: ComponentFixture<RapporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RapporterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
