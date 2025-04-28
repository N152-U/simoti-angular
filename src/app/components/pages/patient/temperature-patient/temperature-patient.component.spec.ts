import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturePatientComponent } from './temperature-patient.component';

describe('TemperaturePatientComponent', () => {
  let component: TemperaturePatientComponent;
  let fixture: ComponentFixture<TemperaturePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperaturePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperaturePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
