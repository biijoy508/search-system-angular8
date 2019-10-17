import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassHanteringComponent } from './mass-hantering.component';

describe('MassHanteringComponent', () => {
  let component: MassHanteringComponent;
  let fixture: ComponentFixture<MassHanteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassHanteringComponent ]
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
