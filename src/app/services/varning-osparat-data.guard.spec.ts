import { TestBed, async, inject } from '@angular/core/testing';

import { VarningOsparatDataGuard } from './varning-osparat-data.guard';

describe('VarinigOspadedataDataGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VarningOsparatDataGuard]
    });
  });

  it('should ...', inject([VarningOsparatDataGuard], (guard: VarningOsparatDataGuard) => {
    expect(guard).toBeTruthy();
  }));
});
