import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Tutor } from '@app/interfaces/tutors';
import { Doctor } from '@app/interfaces/doctors';

import { ManageUsersService } from '@app/services/managment/manage-users/manage-users.service';
import { PatientsService } from '@app/services/managment/patients/patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  currentStep = 0;
  steps = [
    { label: 'Datos Personales' },
    { label: 'Salud y Síntomas' },
    { label: 'Hábitos y Antecedentes' }
  ];

  dataTutor: Select2Data = [];
  dataDoctor: Select2Data = [];

  tutors: Tutor[] = [];
  doctors: Doctor[] = [];

  public hash: string = '';

  pattern =
    '^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*[-._]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$';


  healthForm: FormGroup | any;

  constructor(private fb: FormBuilder, private mus: ManageUsersService, private ps: PatientsService,private router: Router,
    private route: ActivatedRoute,
  ) {


  }

  ngOnInit(): void {
    this.hash = this.route.snapshot.params["hash"];

    this.healthForm = this.fb.group({
      // Sección 1 - Datos Personales
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
          Validators.pattern(this.pattern),
        ],
      ],
      middle_name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
          Validators.pattern(this.pattern),
        ],
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
          Validators.pattern(this.pattern),
        ],
      ],
      date_of_birth: ['', Validators.required],
      tutor_id: ['', Validators.required],
      doctor_id: ['', Validators.required],

      // Sección 2 - Salud y Síntomas
      estadoGeneral: ['0', Validators.required],
      energia: ['0', Validators.required],
      fiebre: ['0', Validators.required],
      dolorPecho: ['0', Validators.required],
      mareos: ['0', Validators.required],
      tempAlta: ['0', Validators.required],
      sudores: ['0', Validators.required],
      palpitaciones: ['0', Validators.required],
      taquicardiaReposo: ['0', Validators.required],
      caidas: ['0', Validators.required],
      inestabilidad: ['0', Validators.required],
      cambioLugar: ['0', Validators.required],
      dificultadEjercicio: ['0', Validators.required],
      disneaActividades: ['0', Validators.required],

      // Sección 3 - Hábitos y Antecedentes
      frutasVerduras: ['0', Validators.required],
      agua: ['0', Validators.required],
      actividadFisica: ['0', Validators.required],
      horasSueño: ['0', Validators.required],
      despertarNocturno: ['0', Validators.required],
      historiaMedica: ['0', Validators.required],
      medicamentos: ['0', Validators.required],
      antecedentesCardiacos: ['0', Validators.required],
      antecedentesRespiratorios: ['0', Validators.required],
      obesidad: ['0', Validators.required],
      diabetesFamilia: ['0', Validators.required],
      diabetes: ['0', Validators.required],
      enfermedadCronica: ['0', Validators.required],
      cualEnfermedad: ['0']
    });

    this.cargarAvance();

    this.mus.GetByUsersType("d88d9411-c944-463a-985c-8d938875d3e3").subscribe((res: any) => {
      this.tutors = res;

      this.tutors.forEach((value: any) => {

        this.dataTutor.push({
          value: value.id,
          label: value.full_name,
          data: {
            id: value.id,
            name: value.full_name,
          },
        });
      });
    });

    this.mus.GetByUsersType("f1eda9e1-49f2-473b-8099-126ea5d2c755").subscribe((res: any) => {
      this.doctors = res;
      this.doctors.forEach((value: any) => {
        this.dataDoctor.push({
          value: value.id,
          label: value.full_name,
          data: {
            id: value.id,
            name: value.full_name,
          },
        });
      });
    });

    setTimeout(()=>{
      this.ps.GetPatientEditByHash(this.hash).subscribe((res) => {
        this.healthForm.patchValue(res);
      });
    }, 500);
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  guardarAvance() {
    localStorage.setItem('healthFormData', JSON.stringify(this.healthForm.value));
    alert('Avance guardado exitosamente.');
  }

  cargarAvance() {
    const savedData = localStorage.getItem('healthFormData');
    if (savedData) {
      this.healthForm.patchValue(JSON.parse(savedData));
    }
  }

  CreatePatient() {
    
    Swal.fire({
      title: '¿Desea guardar el nuevo paciente?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.healthForm.value;

        console.log('Formulario enviado:', formData);


        this.ps.CreatePatient(formData).subscribe((res: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Paciente guardado exitosamente',
            showConfirmButton: false,
          });
          this.router.navigate(["/patient"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });

      } else if (result.isDenied) {
        Swal.fire('Paciente no guardado', '', 'info');
      }
    });
  }

  limpiarFormulario() {
    this.healthForm.reset();
    localStorage.removeItem('healthFormData');
  }
  
  get first_name() {
    return this.healthForm.get('first_name');
  }
  get middle_name() {
    return this.healthForm.get('middle_name');
  }
  get last_name() {
    return this.healthForm.get('last_name');
  }

  get tutor_id() {
    return this.healthForm.get('tutor_id');
  }

  get doctor_id() {
    return this.healthForm.get('doctor_id');
  }

  get date_of_birth() {
    return this.healthForm.get('date_of_birth');
  }


  get estadoGeneral() {
    return this.healthForm.get('estadoGeneral');
  }

  get energia() {
    return this.healthForm.get('energia');
  }

  get fiebre() {
    return this.healthForm.get('fiebre');
  }

  get dolorPecho() {
    return this.healthForm.get('dolorPecho');
  }

  get mareos() {
    return this.healthForm.get('mareos');
  }

  get tempAlta() {
    return this.healthForm.get('tempAlta');
  }

  get sudores() {
    return this.healthForm.get('sudores');
  }

  get palpitaciones() {
    return this.healthForm.get('palpitaciones');
  }

  get taquicardiaReposo() {
    return this.healthForm.get('taquicardiaReposo');
  }

  get caidas() {
    return this.healthForm.get('caidas');
  }

  get inestabilidad() {
    return this.healthForm.get('inestabilidad');
  }

  get cambioLugar() {
    return this.healthForm.get('cambioLugar');
  }

  get dificultadEjercicio() {
    return this.healthForm.get('dificultadEjercicio');
  }

  get disneaActividades() {
    return this.healthForm.get('disneaActividades');
  }


  get frutasVerduras() {
    return this.healthForm.get('frutasVerduras');
  }

  get agua() {
    return this.healthForm.get('agua');
  }

  get actividadFisica() {
    return this.healthForm.get('actividadFisica');
  }

  get horasSueño() {
    return this.healthForm.get('horasSueño');
  }

  get despertarNocturno() {
    return this.healthForm.get('despertarNocturno');
  }

  get historiaMedica() {
    return this.healthForm.get('historiaMedica');
  }

  get medicamentos() {
    return this.healthForm.get('medicamentos');
  }

  get antecedentesCardiacos() {
    return this.healthForm.get('antecedentesCardiacos');
  }

  get antecedentesRespiratorios() {
    return this.healthForm.get('antecedentesRespiratorios');
  }

  get obesidad() {
    return this.healthForm.get('obesidad');
  }

  get diabetesFamilia() {
    return this.healthForm.get('diabetesFamilia');
  }

  get diabetesPropia() {
    return this.healthForm.get('diabetes');
  }

  get enfermedadCronica() {
    return this.healthForm.get('enfermedadCronica');
  }

  get cualEnfermedad() {
    return this.healthForm.get('cualEnfermedad');
  }


}