import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '@app/services/managment/patients/patients.service';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss']
})
export class DetailPatientComponent implements OnInit{

  public patient: any = {}
  public hash: string = '';
  
  constructor(
    private ps: PatientsService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ){}


  ngOnInit(): void {
    this.hash = this.route.snapshot.params["hash"];

    this.ps.GetPatientByHash(this.hash).subscribe((res) => {
      this.patient = res;
    });
  }

}
