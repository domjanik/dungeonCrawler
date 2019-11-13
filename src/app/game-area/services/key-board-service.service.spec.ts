import { TestBed } from '@angular/core/testing';

import { KeyBoardServiceService } from './key-board-service.service';

describe('KeyBoardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyBoardServiceService = TestBed.get(KeyBoardServiceService);
    expect(service).toBeTruthy();
  });
});
