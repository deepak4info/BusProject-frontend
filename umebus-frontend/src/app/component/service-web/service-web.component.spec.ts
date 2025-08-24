import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceWebComponent } from './service-web.component';

describe('ServiceWebComponent', () => {
  let component: ServiceWebComponent;
  let fixture: ComponentFixture<ServiceWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
