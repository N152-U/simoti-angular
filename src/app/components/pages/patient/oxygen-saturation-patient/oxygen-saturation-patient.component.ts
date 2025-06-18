import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';
import 'chartjs-adapter-moment';

import { PatientsService } from '@app/services/managment/patients/patients.service';

@Component({
  selector: 'app-oxygen-saturation-patient',
  templateUrl: './oxygen-saturation-patient.component.html',
  styleUrls: ['./oxygen-saturation-patient.component.scss']
})
export class OxygenSaturationPatientComponent implements OnInit {
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef;

  public chart: any;
  public indicator: any = 'Indicador de Saturación de oxígeno';
  public age: any = 25;

  fechaInicio: string = '';
  fechaFin: string = '';
  public hash: string = '';
  public oxygen: { fecha: string, valor: number }[] = [];
  public patient: any = {}

  constructor(private ps: PatientsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.hash = this.route.snapshot.params["hash"];

    this.ps.GetPatientDetailByHash(this.hash).subscribe((res) => {
      this.patient = res;
    });

    const today = moment().format('YYYY-MM-DD');

    this.fechaInicio = today;
    this.fechaFin = today;

    this.getOxygenData(today, today)
  }

  getOxygenData(startDate: string, endDate: string): void {
    this.ps.GetPatientOxygenSaturationByHash(this.hash, startDate, endDate).subscribe((res: any) => {

      const dataArray = Array.isArray(res) ? res : [];

      this.oxygen = dataArray.map((item: any) => ({
        fecha: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
        valor: parseFloat(item.value)
      }));

      this.createChart();
    });
  }


  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    setTimeout(() => {
      const ctx = this.myChartCanvas?.nativeElement?.getContext('2d');
      if (!ctx) {
        console.error('No se pudo obtener el contexto del canvas.');
        return;
      }

      const labels = this.oxygen.map((item) => item.fecha);
      const data = this.oxygen.map((item) => item.valor);

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Saturación de oxígeno',
              data,
              borderColor: '#8634d7',
              backgroundColor: 'rgba(134, 52, 215, 0.2)',
        
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 2.5,
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: 35,
              suggestedMax: 42,
              title: {
                display: true,
                text: '%'
              }
            },
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  minute: 'MMM D HH:mm',
                  hour: 'MMM D HH:mm'
                },
                tooltipFormat: 'YYYY-MM-DD HH:mm'
              },
              title: {
                display: true,
                text: 'Fecha y hora'
              },
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
    }, 0);
  }


  filtrar() {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Por favor, selecciona ambas fechas.');
      return;
    }

    if (this.fechaInicio > this.fechaFin) {
      alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
      return;
    }

    this.getOxygenData(this.fechaInicio, this.fechaFin);
  }
}