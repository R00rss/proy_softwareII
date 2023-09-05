import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDetailComponent } from './clients-detail.component';

describe('ClientsDetailComponent', () => {
  let component: ClientsDetailComponent;
  let fixture: ComponentFixture<ClientsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsDetailComponent]
    });
    fixture = TestBed.createComponent(ClientsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
