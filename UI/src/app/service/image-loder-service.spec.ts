import { TestBed } from '@angular/core/testing';

import { ImageLoderService } from './image-loder-service';

describe('ImageLoderService', () => {
  let service: ImageLoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageLoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
