import { TestBed, inject } from '@angular/core/testing';

import { TemplateManagerService } from './template-manager.service';

describe('TemplateManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateManagerService]
    });
  });

  it('should be created', inject([TemplateManagerService], (service: TemplateManagerService) => {
    expect(service).toBeTruthy();
  }));
});
