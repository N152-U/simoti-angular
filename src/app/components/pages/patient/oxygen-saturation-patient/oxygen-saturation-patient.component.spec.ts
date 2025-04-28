import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxygenSaturationPatientComponent } from './oxygen-saturation-patient.component';

describe('OxygenSaturationPatientComponent', () => {
  let component: OxygenSaturationPatientComponent;
  let fixture: ComponentFixture<OxygenSaturationPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxygenSaturationPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OxygenSaturationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
