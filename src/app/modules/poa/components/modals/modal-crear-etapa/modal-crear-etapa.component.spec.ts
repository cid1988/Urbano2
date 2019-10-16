import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearEtapaComponent } from './modal-crear-etapa.component';

describe('ModalCrearEtapaComponent', () => {
  let component: ModalCrearEtapaComponent;
  let fixture: ComponentFixture<ModalCrearEtapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearEtapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
