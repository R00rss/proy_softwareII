import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessNavbarComponent } from './access-navbar.component';

describe('AccessNavbarComponent', () => {
  let component: AccessNavbarComponent;
  let fixture: ComponentFixture<AccessNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessNavbarComponent]
    });
    fixture = TestBed.createComponent(AccessNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
