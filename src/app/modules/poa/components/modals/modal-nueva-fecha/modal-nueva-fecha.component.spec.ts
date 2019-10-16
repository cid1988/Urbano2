import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaFechaComponent } from './modal-nueva-fecha.component';

describe('ModalNuevaFechaComponent', () => {
  let component: ModalNuevaFechaComponent;
  let fixture: ComponentFixture<ModalNuevaFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNuevaFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevaFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
