import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryNumberComponent } from './enquiry-number.component';

describe('EnquiryNumberComponent', () => {
  let component: EnquiryNumberComponent;
  let fixture: ComponentFixture<EnquiryNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
