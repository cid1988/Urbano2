import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaCorreoComponent } from './etiqueta-correo.component';

describe('EtiquetaCorreoComponent', () => {
  let component: EtiquetaCorreoComponent;
  let fixture: ComponentFixture<EtiquetaCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetaCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetaCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
