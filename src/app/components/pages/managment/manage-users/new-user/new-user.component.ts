import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '@app/interfaces/roles';
import { Relationships } from '@app/interfaces/relationships';
import { ManageRolesService } from '@app/services/managment/manage-roles/manage-roles.service';
import { CatalogsService } from '@app/services/managment/catalogs/catalogs.service';
import { ConfirmedValidator } from '@app/services/managment/manage-users/confirmed.validator';
import { ManageUsersService } from '@app/services/managment/manage-users/manage-users.service';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  newUserGroup: FormGroup | any;
  fieldTextType: boolean = false;
  step1: boolean = true;
  stepDoctor: boolean = false;
  fieldTextTypeConfirmation: boolean = false;
  pattern =
    '^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*[-._]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$';
  roles: Roles[] = [];
  relationships: Relationships[] = [];
  selectedRole: string = '';

  data: Select2Data = [];
  dataRelationship: Select2Data = [];
  dataTypeUser: Select2Data = [];

  showParentescoInput: boolean = false; // Controla la visibilidad del input "Parentesco"
  showEspecialidadInput: boolean = false; // Controla la visibilidad del input "Especialidad"

  constructor(
    private router: Router,
    private mrs: ManageRolesService,
    private cs: CatalogsService,
    public formBuilder: FormBuilder,
    private userService: ManageUsersService
  ) { }

  ngOnInit(): void {
    this.newUserGroup = this.formBuilder.group(
      {
        role_id: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
            Validators.pattern(this.pattern),
          ],
        ],
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
        specialty: [''],
        relationship_id: [''],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );

    this.newUserGroup.get('role_id')?.valueChanges.subscribe((valor: any) => {
      this.aplicarValidacionesSegunTipo(valor);
    });



    this.mrs.GetAllRolesTable().subscribe((res: any) => {
      this.roles = res;
      this.roles.forEach((value) => {
        this.data.push({
          value: value.id,
          label: value.role,
          data: {
            id: value.id,
            name: value.role,
          },
        });
      });
    });

    this.cs.GetAllRelationship().subscribe((res: any) => {
      this.relationships = res;
      this.relationships.forEach((value: any) => {
        this.dataRelationship.push({
          value: value.id,
          label: value.name,
          data: {
            id: value.id,
            name: value.name,
          },
        });
      });
    });
  }

  aplicarValidacionesSegunTipo(tipo: string) {
    const role = this.newUserGroup.get('role_id');
    const specialty = this.newUserGroup.get('specialty');
    const relationship_id = this.newUserGroup.get('relationship_id');

    specialty?.clearValidators();
    specialty?.reset();

    relationship_id?.clearValidators();
    relationship_id?.reset();

    if (role.value == 'f1eda9e1-49f2-473b-8099-126ea5d2c755') { //médico
      specialty?.setValidators([Validators.required,
      Validators.minLength(4),
      Validators.maxLength(40),
      Validators.pattern(this.pattern),]);

      relationship_id?.clearValidators();
      relationship_id?.reset();

    } else if (role.value == 'd88d9411-c944-463a-985c-8d938875d3e3') { //tutor
      relationship_id?.setValidators([Validators.required]);

      specialty?.clearValidators();
      specialty?.reset();
    }

    specialty?.updateValueAndValidity();
    relationship_id?.updateValueAndValidity();
  }


  onRoleChange(roleId: string) {
    const selectedRoleData = this.data.find((role) => role.data.id === roleId);
    if (selectedRoleData) {
      this.selectedRole = selectedRoleData.label;

      this.showParentescoInput = selectedRoleData.label === 'Tutor';
      this.showEspecialidadInput = selectedRoleData.label === 'Médico';
    }
  }

  CreateUser() {
    Swal.fire({
      title: '¿Desea guardar el nuevo usuario?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.newUserGroup.value;
        delete formData['confirmPassword'];

        if (formData['role_id'] == 'f1eda9e1-49f2-473b-8099-126ea5d2c755') { //médico
          delete formData['relationship_id'];
        } else if (formData['role_id'] == 'd88d9411-c944-463a-985c-8d938875d3e3') { //tutor
          delete formData['specialty'];
        } else {
          delete formData['specialty'];
          delete formData['relationship_id'];
        }

        console.log(formData);

        this.userService.CreateUser(formData).subscribe((res: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario guardado',
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-users"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      } else if (result.isDenied) {
        Swal.fire('Usuario no guardado', '', 'info');
      }
    });
  }

  nextStep() {
    /* let typeUser: any = document.getElementById("type_user_id") as HTMLInputElement | null;
    if (this.type_user_id.value == 1) {
      this.step1 = false;
      this.stepDoctor = true;
    } */
  }

  get role_id() {
    return this.newUserGroup.get('role_id');
  }
  get username() {
    return this.newUserGroup.get('username');
  }
  get first_name() {
    return this.newUserGroup.get('first_name');
  }
  get middle_name() {
    return this.newUserGroup.get('middle_name');
  }
  get last_name() {
    return this.newUserGroup.get('last_name');
  }
  get password() {
    return this.newUserGroup.get('password');
  }
  get confirmPassword() {
    return this.newUserGroup.get('confirmPassword');
  }

  get email() {
    return this.newUserGroup.get('email');
  }

  get specialty() {
    return this.newUserGroup.get('specialty');
  }

  get relationship_id() {
    return this.newUserGroup.get('relationship_id');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextTypeConfirmation() {
    this.fieldTextTypeConfirmation = !this.fieldTextTypeConfirmation;
  }
}
