import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationDialogComponent } from './add-station-dialog.component';

describe('AddStationDialogComponent', () => {
  let component: AddStationDialogComponent;
  let fixture: ComponentFixture<AddStationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
