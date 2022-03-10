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
    patientId: new FormControl(),
    patientDNI: new FormControl(''),
    patientName: new FormControl(''),
    patientLastName: new FormControl(''),
    patientBithDate: new FormControl(''),
    patientEmail: new FormControl(''),
    patientTlfn: new FormControl(0),
    patientAdress: new FormControl(''),
    patientPrice: new FormControl(0),
  });

  formButtonText = 'Añadir Paciente';
  displayPatientForm = false;
  displayConfirmDelete = false;
  idForDeletion = '';
  descriptionForDeletion = '';

  constructor(public patientService: PatientService) {
    this.patients = this.patientService.getPatients();
  }

  addPatient() {
    this.patientService.addPatient(this.patientForm.value);
    this.patientForm.reset();
  }

  updatePatientStep1(id: string) {
    this.displayPatientForm = true;

    this.patientService.getPatient(id).subscribe((data) => {
      this.patientForm.patchValue(data);
      console.log('data: ' + JSON.stringify(data));
    });

    this.formButtonText = 'Actualizar paciente';
    this.patientForm.reset();
  }

  updatePatientStep2() {
    this.patientService.updatePatient(this.patientForm.value);
    console.log('updatePatient');
  }

  formSubmit() {
    this.formButtonText === 'Añadir paciente'
      ? this.addPatient()
      : this.updatePatientStep2();

    this.displayPatientForm = false;
    this.patientForm.reset();
  }

  cancel() {
    this.displayPatientForm = false;
    this.patientForm.reset();
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
