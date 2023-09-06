import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageComponent } from './baggage.component';

describe('BaggageComponent', () => {
  let component: BaggageComponent;
  let fixture: ComponentFixture<BaggageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaggageComponent]
    });
    fixture = TestBed.createComponent(BaggageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
