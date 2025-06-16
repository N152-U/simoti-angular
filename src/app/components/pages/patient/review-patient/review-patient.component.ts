import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientsService } from '@app/services/managment/patients/patients.service';


@Component({
  selector: 'app-review-patient',
  templateUrl: './review-patient.component.html',
  styleUrls: ['./review-patient.component.scss']
})
export class ReviewPatientComponent implements OnInit {

  public namePatient: any = 'Andrea Naraly Solis Martinez';

  public patient: any = {}

  public hash: string = '';

  birthDate = "06/08/1999";
  patientData: any = {
    tempAlta: '1',
    sudores: '0',
    palpitaciones: '1',
    taquicardiaReposo: '0',
    caidas: '1',
    inestabilidad: '0',
    cambioLugar: '1',
    dificultadEjercicio: '0',
    disneaActividades: '1',
    frutasVerduras: '1',
    agua: '0',
    actividadFisica: '1',
    horasSueno: '0',
    despertarNocturno: '1',
    historiaMedica: '0',
    medicamentos: '1',
    antecedentesCardiacos: '0',
    antecedentesRespiratorios: '1',
    obesidad: '0',
    diabetesFamilia: 'No se sabe',
    diabetes: '0',
    enfermedadCronica: '1',
    cualEnfermedad: 'Hipertensión arterial',
  };

  saludSintomas: any = [
    { label: '¿Te has sentido bien en la última semana?', key: 'generalCondition' },
    { label: '¿Has tenido cambios en tu nivel de energía?', key: 'energy' },
    { label: '¿Has tenido fiebre en los últimos días?', key: 'fever' },
    { label: '¿Has sentido dolor en el pecho recientemente?', key: 'chestPain' },
    { label: '¿Has experimentado mareos o desmayos en la última semana?', key: 'dizziness' },
    { label: '¿Has notado que tu temperatura ha estado más alta de lo normal?', key: 'highTemperature' },
    { label: '¿Has tenido sudores nocturnos?', key: 'sweating' },
    { label: '¿Has sentido palpitaciones en el corazón?', key: 'palpitations' },
    { label: '¿Tu corazón late más rápido de lo habitual en reposo?', key: 'restingTachycardia' },
    { label: '¿Has tenido alguna caída en el último mes?', key: 'falls' },
    { label: '¿Te sientes inestable al caminar?', key: 'instability' },
    { label: '¿Has experimentado cambios en tu salud al cambiar de lugar de residencia?', key: 'changeOfLocation' },
    { label: '¿Has tenido dificultad para respirar al hacer ejercicio?', key: 'exerciseDifficulty' },
    { label: '¿Te sientes corto de aliento al realizar actividades cotidianas?', key: 'dyspneaActivities' },
  ];

  antecedentesMedicos: any = [
    { label: '¿Consumes frutas y verduras a diario?', key: 'fruitsVegetables' },
    { label: '¿Bebes suficiente agua diariamente?', key: 'water' },
    { label: '¿Realizas actividad física al menos 3 veces por semana?', key: 'physicalActivity' },
    { label: '¿Duermes al menos 7 horas por noche?', key: 'sleepHours' },
    { label: '¿Te despiertas durante la noche con frecuencia?', key: 'nighttimeWaking' },
    { label: '¿Tienes alguna condición médica preexistente?', key: 'medicalHistory' },
    { label: '¿Estás tomando medicamentos actualmente?', key: 'medications' },
    { label: '¿Hay antecedentes familiares de enfermedades cardíacas?', key: 'cardiacHistory' },
    { label: '¿Hay antecedentes familiares de enfermedades respiratorias?', key: 'respiratoryHistory' },
    { label: '¿Sufre de obesidad?', key: 'obesity' },
    { label: '¿Tiene familiares cercanos que padezcan diabetes mellitus?', key: 'familyDiabetes' },
    { label: '¿Padece diabetes mellitus?', key: 'diabetes' },
    { label: '¿Tiene alguna enfermedad crónica?', key: 'chronicDisease' },
  ];



  constructor(private route: ActivatedRoute, private router: Router, private ps: PatientsService) { }

  ngOnInit() {

    this.hash = this.route.snapshot.params["hash"];

    this.ps.GetPatientDetailByHash(this.hash).subscribe((res) => {
      this.patient = res;
    });
  }

  mostrarSiNo(valor: string | number): string {
    return valor === '1' || valor === 1 ? 'Sí' : 'No';
  }

  mostrarConNoSe(valor: string): string {
    return valor === '1' ? 'Sí' : valor === '0' ? 'No' : 'No se sabe';
  }

  volver() {
    this.router.navigate(['/patient']);
  }

}