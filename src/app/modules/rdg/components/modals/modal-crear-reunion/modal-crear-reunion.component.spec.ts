import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearReunionComponent } from './modal-crear-reunion.component';

describe('ModalCrearReunionComponent', () => {
  let component: ModalCrearReunionComponent;
  let fixture: ComponentFixture<ModalCrearReunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearReunionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
