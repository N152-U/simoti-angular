import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDoctorComponent } from './detail-doctor.component';

describe('DetailDoctorComponent', () => {
  let component: DetailDoctorComponent;
  let fixture: ComponentFixture<DetailDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
