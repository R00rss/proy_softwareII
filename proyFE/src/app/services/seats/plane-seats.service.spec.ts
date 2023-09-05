import { TestBed } from '@angular/core/testing';

import { PlaneSeatsService } from './plane-seats.service';

describe('PlaneSeatsService', () => {
  let service: PlaneSeatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneSeatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
