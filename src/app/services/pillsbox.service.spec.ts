import { TestBed } from '@angular/core/testing';

import { PillsboxService } from './pillsbox.service';

describe('PillsboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PillsboxService = TestBed.get(PillsboxService);
    expect(service).toBeTruthy();
  });
});
