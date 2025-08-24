import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteDialogComponent } from './bus-route-dialog.component';

describe('BusRouteDialogComponent', () => {
  let component: BusRouteDialogComponent;
  let fixture: ComponentFixture<BusRouteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusRouteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusRouteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
