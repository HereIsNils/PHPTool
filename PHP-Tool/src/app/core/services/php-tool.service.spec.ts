import { TestBed } from '@angular/core/testing';

import { PhpToolService } from './php-tool.service';

describe('PhpToolService', () => {
  let service: PhpToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhpToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
