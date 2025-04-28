import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRatePatientComponent } from './heart-rate-patient.component';

describe('HeartRatePatientComponent', () => {
  let component: HeartRatePatientComponent;
  let fixture: ComponentFixture<HeartRatePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartRatePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartRatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
