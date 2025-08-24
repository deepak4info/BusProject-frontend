import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationRoutesDialogComponent } from './station-routes-dialog.component';

describe('StationRoutesDialogComponent', () => {
  let component: StationRoutesDialogComponent;
  let fixture: ComponentFixture<StationRoutesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationRoutesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationRoutesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
