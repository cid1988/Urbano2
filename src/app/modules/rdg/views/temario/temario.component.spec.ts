import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemarioComponent } from './temario.component';

describe('TemarioComponent', () => {
  let component: TemarioComponent;
  let fixture: ComponentFixture<TemarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
