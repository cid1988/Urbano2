import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunasListaBadgeComponent } from './comunas-lista-badge.component';

describe('ComunasListaBadgeComponent', () => {
  let component: ComunasListaBadgeComponent;
  let fixture: ComponentFixture<ComunasListaBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunasListaBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunasListaBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
