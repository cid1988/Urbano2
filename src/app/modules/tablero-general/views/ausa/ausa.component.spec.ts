import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusaComponent } from './ausa.component';

describe('AusaComponent', () => {
  let component: AusaComponent;
  let fixture: ComponentFixture<AusaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
