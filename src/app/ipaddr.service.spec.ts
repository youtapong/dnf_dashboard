import { TestBed } from '@angular/core/testing';

import { IpaddrService } from './ipaddr.service';

describe('IpaddrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpaddrService = TestBed.get(IpaddrService);
    expect(service).toBeTruthy();
  });
});
