import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsShoesComponent } from './kids-shoes.component';

describe('KidsShoesComponent', () => {
  let component: KidsShoesComponent;
  let fixture: ComponentFixture<KidsShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidsShoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
