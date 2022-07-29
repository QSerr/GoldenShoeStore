import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensShoesComponent } from './womens-shoes.component';

describe('WomensShoesComponent', () => {
  let component: WomensShoesComponent;
  let fixture: ComponentFixture<WomensShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomensShoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WomensShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
