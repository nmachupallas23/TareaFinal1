import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditar } from './popup-editar';

describe('PopupEditar', () => {
  let component: PopupEditar;
  let fixture: ComponentFixture<PopupEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
