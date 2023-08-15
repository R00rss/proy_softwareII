import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposClaseComponent } from './tipos-clase.component';

describe('TiposClaseComponent', () => {
  let component: TiposClaseComponent;
  let fixture: ComponentFixture<TiposClaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposClaseComponent]
    });
    fixture = TestBed.createComponent(TiposClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
