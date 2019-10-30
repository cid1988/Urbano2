import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleReunionComponent } from './modal-detalle-reunion.component';

describe('ModalDetalleReunionComponent', () => {
  let component: ModalDetalleReunionComponent;
  let fixture: ComponentFixture<ModalDetalleReunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleReunionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
