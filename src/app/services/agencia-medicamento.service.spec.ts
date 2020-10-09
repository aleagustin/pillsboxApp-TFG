import { TestBed } from '@angular/core/testing';

import { AgenciaMedicamentoService } from './agencia-medicamento.service';

describe('AgenciaMedicamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgenciaMedicamentoService = TestBed.get(AgenciaMedicamentoService);
    expect(service).toBeTruthy();
  });
});
