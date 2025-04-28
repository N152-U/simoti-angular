import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallDetectorPatientComponent } from './fall-detector-patient.component';

describe('FallDetectorPatientComponent', () => {
  let component: FallDetectorPatientComponent;
  let fixture: ComponentFixture<FallDetectorPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallDetectorPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallDetectorPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
