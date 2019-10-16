import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearActividadComponent } from './modal-crear-actividad.component';

describe('ModalCrearActividadComponent', () => {
  let component: ModalCrearActividadComponent;
  let fixture: ComponentFixture<ModalCrearActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
