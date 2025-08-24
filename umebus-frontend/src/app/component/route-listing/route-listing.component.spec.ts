import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteListingComponent } from './route-listing.component';

describe('RouteListingComponent', () => {
  let component: RouteListingComponent;
  let fixture: ComponentFixture<RouteListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
