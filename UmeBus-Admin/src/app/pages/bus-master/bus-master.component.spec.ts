import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusMasterComponent } from './bus-master.component';

describe('BusMasterComponent', () => {
  let component: BusMasterComponent;
  let fixture: ComponentFixture<BusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
