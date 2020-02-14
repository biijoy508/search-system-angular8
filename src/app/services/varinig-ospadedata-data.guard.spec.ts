import { TestBed, async, inject } from '@angular/core/testing';

import { VarinigOspadedataDataGuard } from './varinig-ospadedata-data.guard';

describe('VarinigOspadedataDataGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VarinigOspadedataDataGuard]
    });
  });

  it('should ...', inject([VarinigOspadedataDataGuard], (guard: VarinigOspadedataDataGuard) => {
    expect(guard).toBeTruthy();
  }));
});
