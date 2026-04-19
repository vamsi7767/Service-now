import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admindashbord } from './admindashbord';

describe('Admindashbord', () => {
  let component: Admindashbord;
  let fixture: ComponentFixture<Admindashbord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admindashbord],
    }).compileComponents();

    fixture = TestBed.createComponent(Admindashbord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
