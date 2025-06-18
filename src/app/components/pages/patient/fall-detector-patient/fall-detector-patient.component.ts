import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';
import 'chartjs-adapter-moment';

import { PatientsService } from '@app/services/managment/patients/patients.service';

@Component({
  selector: 'app-fall-detector-patient',
  templateUrl: './fall-detector-patient.component.html',
  styleUrls: ['./fall-detector-patient.component.scss']
})
export class FallDetectorPatientComponent implements OnInit {
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef;

  public chart: any;
  public indicator: any = 'Indicador de Detección de caídas';
  public age: any = 25;

  fechaInicio: string = '';
  fechaFin: string = '';
  public hash: string = '';
  public fallDetector: { fecha: string, valor: number, description:string }[] = [];
  public patient: any = {}
  public indicador: any= '';

  constructor(private ps: PatientsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.hash = this.route.snapshot.params["hash"];

    this.ps.GetPatientDetailByHash(this.hash).subscribe((res) => {
      this.patient = res;
    });

    const today = moment().format('YYYY-MM-DD');

    this.fechaInicio = today;
    this.fechaFin = today;

    this.getFallDetectorData(today, today)
  }

  getFallDetectorData(startDate: string, endDate: string): void {
    this.ps.GetPatientFallDetectorByHash(this.hash, startDate, endDate).subscribe((res: any) => {
      const dataArray = Array.isArray(res) ? res : [];
  
      this.fallDetector = dataArray.map((item: any) => ({
        fecha: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
        valor: parseFloat(item.value),
        description: item.description
      }));
  
      const totalCaidas = this.fallDetector.length;
  
      const diasDiferencia = moment(endDate).diff(moment(startDate), 'days') + 1;
      const tasaPromedio = totalCaidas / diasDiferencia;
  
  
      this.indicador = `Total: ${totalCaidas} caídas (${tasaPromedio.toFixed(2)} por día)`;
  
      this.createChart();
    });
  }
  

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const agrupadoPorDia: Record<string, number> = {};
  
    this.fallDetector.forEach(item => {
      const fechaDia = item.fecha.substring(0, 10);
      if (!agrupadoPorDia[fechaDia]) {
        agrupadoPorDia[fechaDia] = 0;
      }
      agrupadoPorDia[fechaDia]++;
    });
  
    const labels = Object.keys(agrupadoPorDia).sort();
    const data = labels.map(fecha => agrupadoPorDia[fecha]);
  
    setTimeout(() => {
      const ctx = this.myChartCanvas?.nativeElement?.getContext('2d');
      if (!ctx) {
        console.error('No se pudo obtener el contexto del canvas.');
        return;
      }
  
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Caídas por día',
              data,
              backgroundColor: '#F6901A',
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 2.5,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de caídas'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Fecha (día)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
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

    this.getFallDetectorData(this.fechaInicio, this.fechaFin);
  }
}