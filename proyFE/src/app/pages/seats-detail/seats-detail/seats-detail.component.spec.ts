import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsDetailComponent } from './seats-detail.component';

describe('SeatsDetailComponent', () => {
  let component: SeatsDetailComponent;
  let fixture: ComponentFixture<SeatsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatsDetailComponent]
    });
    fixture = TestBed.createComponent(SeatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
