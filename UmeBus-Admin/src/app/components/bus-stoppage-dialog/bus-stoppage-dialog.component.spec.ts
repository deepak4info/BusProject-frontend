import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStoppageDialogComponent } from './bus-stoppage-dialog.component';

describe('BusStoppageDialogComponent', () => {
  let component: BusStoppageDialogComponent;
  let fixture: ComponentFixture<BusStoppageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStoppageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStoppageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
