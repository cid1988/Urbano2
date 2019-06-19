import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosPorPlanComponent } from './proyectos-por-plan.component';

describe('ProyectosPorPlanComponent', () => {
  let component: ProyectosPorPlanComponent;
  let fixture: ComponentFixture<ProyectosPorPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosPorPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosPorPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
