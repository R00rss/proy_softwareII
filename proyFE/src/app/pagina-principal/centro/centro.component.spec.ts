import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroComponent } from './centro.component';

describe('CentroComponent', () => {
  let component: CentroComponent;
  let fixture: ComponentFixture<CentroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentroComponent]
    });
    fixture = TestBed.createComponent(CentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
