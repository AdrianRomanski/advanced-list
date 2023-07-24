import { TestBed } from '@angular/core/testing';

import { AdvancedListService } from './advanced-list.service';

describe('AdvancedListService', () => {
  let service: AdvancedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
