import { Component, OnInit } from "@angular/core";
import { HypochloriteEgressService } from '@app/services/hypochlorite/egress/hypochlorite-egress.service';
import { saveAs } from 'file-saver';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{

  report: FormGroup | any;

  constructor(
    private hes: HypochloriteEgressService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {

    this.report = this.fb.group({
      reportOption: ['', Validators.required],
      initialDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })

  }

  public downloadReport(): any{
    const formData = this.report.value;
    const now = Date.now();
    let mediaType = 'application/pdf';
    this.hes.getHypochloriteEgressReportPDFRangeOfDates(this.dateFormat(formData.initialDate), this.dateFormat(formData.endDate)).subscribe(
        (response) => {
            let blob = new Blob([response], { type: mediaType });
            saveAs(blob, `informe-entregas-hipoclorito-${now}.pdf`);
        }
  );}

  private dateFormat(date:string): string{
    const supply_dateSplit = date.split("T")
    const formatedDate = supply_dateSplit[0] + " " + supply_dateSplit[1];
    return formatedDate;
  }

  get initialDate() {
    return this.report.get("initialDate");
  }
  get endDate() {
    return this.report.get("endDate");
  }
  get reportOption() {
    return this.report.get("reportOption");
  }
}
