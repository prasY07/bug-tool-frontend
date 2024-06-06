import { TestBed } from '@angular/core/testing';

import { UserBaseApiService } from './user-base-api.service';

describe('UserBaseApiService', () => {
  let service: UserBaseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBaseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
