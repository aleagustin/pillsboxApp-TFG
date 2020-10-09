import { TestBed } from '@angular/core/testing';

import { MedicacionService } from './medicacion.service';

describe('MedicacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicacionService = TestBed.get(MedicacionService);
    expect(service).toBeTruthy();
  });
});
