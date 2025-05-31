import { Component,OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-fall-detector-patient',
  templateUrl: './fall-detector-patient.component.html',
  styleUrls: ['./fall-detector-patient.component.scss']
})
export class FallDetectorPatientComponent implements OnInit {

  public chart: any;
  public namePatient: any = 'Andrea Naraly Solis Martinez';
  public tutorPatient: any = 'Tutora';
  public indicator: any = 'Indicador de Detección de Caídas';
  public age: any = 25;

  fechaInicio: string = '';
  fechaFin: string = '';

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }



  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'line',

      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Detección de Caídas",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: '#F6901A'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
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

    // Aquí tu lógica para filtrar
    console.log('Filtrando desde', this.fechaInicio, 'hasta', this.fechaFin);
  }
}