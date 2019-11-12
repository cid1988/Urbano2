import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompromisoComponent } from './modal-compromiso.component';

describe('ModalCompromisoComponent', () => {
  let component: ModalCompromisoComponent;
  let fixture: ComponentFixture<ModalCompromisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompromisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompromisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
