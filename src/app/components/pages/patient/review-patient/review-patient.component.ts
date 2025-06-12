import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-patient',
  templateUrl: './review-patient.component.html',
  styleUrls: ['./review-patient.component.scss']
})
export class ReviewPatientComponent implements OnInit {

  public namePatient: any = 'Andrea Naraly Solis Martinez';

  patient: any;
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
    { label: '¿Te has sentido bien en la última semana?', key: 'tempAlta' },
    { label: '¿Has tenido cambios en tu nivel de energía?', key: 'sudores' },
    { label: '¿Has tenido fiebre en los últimos días?', key: 'palpitaciones' },
    { label: '¿Has sentido dolor en el pecho recientemente?', key: 'taquicardiaReposo' },
    { label: '¿Has experimentado mareos o desmayos en la última semana?', key: 'caidas' },
    { label: '¿Has notado que tu temperatura ha estado más alta de lo normal?', key: 'inestabilidad' },
    { label: '¿Has tenido sudores nocturnos?', key: 'cambioLugar' },
    { label: '¿Has sentido palpitaciones en el corazón?', key: 'dificultadEjercicio' },
    { label: '¿Tu corazón late más rápido de lo habitual en reposo?', key: 'disneaActividades' },
    { label: '¿Has tenido alguna caída en el último mes?', key: 'frutasVerduras' },
    { label: '¿Te sientes inestable al caminar?', key: 'agua' },
    { label: '¿Has experimentado cambios en tu salud al cambiar de lugar de residencia?', key: 'actividadFisica' },
    { label: '¿Has tenido dificultad para respirar al hacer ejercicio?', key: 'horasSueno' },
    { label: '¿Te sientes corto de aliento al realizar actividades cotidianas?', key: 'despertarNocturno' },
  ];

  antecedentesMedicos: any = [
    { label: '¿Consumes frutas y verduras a diario?', key: 'frutasVerduras' },
    { label: '¿Bebes suficiente agua diariamente?', key: 'agua' },
    { label: '¿Realizas actividad física al menos 3 veces por semana?', key: 'actividadFisica' },
    { label: '¿Duermes al menos 7 horas por noche?', key: 'horasSueno' },
    { label: '¿Te despiertas durante la noche con frecuencia?', key: 'despertarNocturno' },
    { label: '¿Tienes alguna condición médica preexistente?', key: 'historiaMedica' },
    { label: '¿Estás tomando medicamentos actualmente?', key: 'medicamentos' },
    { label: '¿Hay antecedentes familiares de enfermedades cardíacas?', key: 'antecedentesCardiacos' },
    { label: '¿Hay antecedentes familiares de enfermedades respiratorias?', key: 'antecedentesRespiratorios' },
    { label: '¿Sufre de obesidad?', key: 'obesidad' },
    { label: '¿Tiene familiares cercanos que padezcan diabetes mellitus?', key: 'diabetesFamilia' },
    { label: '¿Padece diabetes mellitus?', key: 'diabetes' },
    { label: '¿Tiene alguna enfermedad crónica?', key: 'enfermedadCronica' },
  ];



  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const nav = history.state;
    this.patient = nav.patient || {};
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