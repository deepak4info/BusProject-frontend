import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChooseComponent } from './home-choose.component';

describe('HomeChooseComponent', () => {
  let component: HomeChooseComponent;
  let fixture: ComponentFixture<HomeChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeChooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
