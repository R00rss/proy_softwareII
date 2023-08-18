import { TestBed } from '@angular/core/testing';

import { BlockGUIService } from './block-gui.service';

describe('BlockGUIService', () => {
  let service: BlockGUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockGUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
