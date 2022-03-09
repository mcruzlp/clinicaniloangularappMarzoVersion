import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Patient } from './patient';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  patients: Observable<Patient[]>;

  patientForm = new FormGroup({
    patientId: new FormControl(''),
    patientName: new FormControl(''),
    patientLastName: new FormControl(''),
    patientBithDate: new FormControl(''),
    patientEmail: new FormControl(''),
    patientTlfn: new FormControl(0),
    patientPrice: new FormControl(0),
  });

  formButtonText = 'Añadir Paciente';
  displaypatientForm = false;
  displayConfirmDelete = false;
  idForDeletion = '';
  descriptionForDeletion = '';

  constructor(public patientService: PatientService) {
    this.patients = this.patientService.getPatients();
  }

  addPatient() {
    this.patientService.addPatient(this.patientForm.value);
    this.patientForm.reset({ patientTlfn: 0, patientPrice: 0 });
  }

  updatePatientStep1(id: string) {
    this.patientService.getPatient(id).subscribe((data) => {
      this.patientForm.patchValue(data);
      console.log('data: ' + JSON.stringify(data));
    });

    this.formButtonText = 'Actualizar paciente';
  }

  updatePatientStep2() {
    this.patientService.updatePatient(this.patientForm.value);
    console.log('updatePatient');
  }

  formSubmit() {
    this.formButtonText === 'Añadir paciente'
      ? this.addPatient()
      : this.updatePatientStep2();

    this.displaypatientForm = false;
  }

  confirmDeletePatient(patient: Patient) {
    this.idForDeletion = patient.patientId;
    this.descriptionForDeletion = patient.patientName;
    this.displayConfirmDelete = true;
  }

  deletePatient() {
    this.patientService.deletePatient(this.idForDeletion);
    this.displayConfirmDelete = false;
  }
}
