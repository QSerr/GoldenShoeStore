import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensShoesComponent } from './mens-shoes.component';

describe('MensShoesComponent', () => {
  let component: MensShoesComponent;
  let fixture: ComponentFixture<MensShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensShoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
