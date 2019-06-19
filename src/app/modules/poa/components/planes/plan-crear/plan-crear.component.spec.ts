import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCrearComponent } from './plan-crear.component';

describe('PlanCrearComponent', () => {
  let component: PlanCrearComponent;
  let fixture: ComponentFixture<PlanCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
