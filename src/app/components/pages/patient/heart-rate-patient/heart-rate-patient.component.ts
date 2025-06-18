import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';
import 'chartjs-adapter-moment';

import { PatientsService } from '@app/services/managment/patients/patients.service';

@Component({
  selector: 'app-heart-rate-patient',
  templateUrl: './heart-rate-patient.component.html',
  styleUrls: ['./heart-rate-patient.component.scss']
})
export class HeartRatePatientComponent implements OnInit {
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef;

  public chart: any;
  public indicator: any = 'Indicador de Frecuencia Cardiaca';
  public age: any = 25;

  fechaInicio: string = '';
  fechaFin: string = '';
  public hash: string = '';
  public heartRate: { fecha: string, valor: number }[] = [];
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

    this.getHeartRateData(today, today)
  }

  getHeartRateData(startDate: string, endDate: string): void {
    this.ps.GetPatientHeartRateByHash(this.hash, startDate, endDate).subscribe((res: any) => {

      const dataArray = Array.isArray(res) ? res : [];

      this.heartRate = dataArray.map((item: any) => ({
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

      const labels = this.heartRate.map((item) => item.fecha);
      const data = this.heartRate.map((item) => item.valor);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Fecuencia Cardiaca (LPM)',
              data,
              borderColor: '#EE5487',
              backgroundColor: 'rgba(238, 84, 135, 0.2)',
              fill: true,
              tension: 0.3,
              pointRadius: 5,
              pointHoverRadius: 7
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
                text: 'LPM'
              }
            },
            x: {
              type: 'time',
              time: {
                unit: 'minute',
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

    this.getHeartRateData(this.fechaInicio, this.fechaFin);
  }
}