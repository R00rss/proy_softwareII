import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersSelectorComponent } from './passengers-selector.component';

describe('PassengersSelectorComponent', () => {
  let component: PassengersSelectorComponent;
  let fixture: ComponentFixture<PassengersSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengersSelectorComponent]
    });
    fixture = TestBed.createComponent(PassengersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
