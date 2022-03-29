import { TestBed } from '@angular/core/testing';

import { PhpTool2Service } from './php-tool2.service';

describe('PhpTool2Service', () => {
  let service: PhpTool2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhpTool2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
