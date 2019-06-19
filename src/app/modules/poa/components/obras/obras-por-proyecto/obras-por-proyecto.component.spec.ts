import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasPorProyectoComponent } from './obras-por-proyecto.component';

describe('ObrasPorProyectoComponent', () => {
  let component: ObrasPorProyectoComponent;
  let fixture: ComponentFixture<ObrasPorProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrasPorProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasPorProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
