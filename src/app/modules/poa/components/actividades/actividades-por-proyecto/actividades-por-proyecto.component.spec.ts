import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesPorProyectoComponent } from './actividades-por-proyecto.component';

describe('ActividadesPorProyectoComponent', () => {
  let component: ActividadesPorProyectoComponent;
  let fixture: ComponentFixture<ActividadesPorProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesPorProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesPorProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
