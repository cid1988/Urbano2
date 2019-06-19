import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapasPorProyectoComponent } from './etapas-por-proyecto.component';

describe('EtapasPorProyectoComponent', () => {
  let component: EtapasPorProyectoComponent;
  let fixture: ComponentFixture<EtapasPorProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapasPorProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapasPorProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
