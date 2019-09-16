import { TestBed } from '@angular/core/testing';

import { CurrentPricesService } from './current-prices.service';

describe('CurrentPricesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentPricesService = TestBed.get(CurrentPricesService);
    expect(service).toBeTruthy();
  });
});
