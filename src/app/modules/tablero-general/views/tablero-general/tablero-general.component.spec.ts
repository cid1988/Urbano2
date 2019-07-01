import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroGeneralComponent } from './tablero-general.component';

describe('TableroGeneralComponent', () => {
  let component: TableroGeneralComponent;
  let fixture: ComponentFixture<TableroGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
