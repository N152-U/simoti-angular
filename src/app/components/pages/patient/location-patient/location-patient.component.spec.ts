import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPatientComponent } from './location-patient.component';

describe('LocationPatientComponent', () => {
  let component: LocationPatientComponent;
  let fixture: ComponentFixture<LocationPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
