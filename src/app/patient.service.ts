import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private firestore: Firestore) {}

  async addPatient(patient: Patient) {
    try {
      const docRef = await addDoc(
        collection(this.firestore, 'patients'),
        patient
      );
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  getPatients(): Observable<Patient[]> {
    return collectionData(collection(this.firestore, 'patients'), {
      idField: 'patientId',
    }) as Observable<Patient[]>;
  }

  async deletePatient(id: string) {
    await deleteDoc(doc(this.firestore, `patients/${id}`));
  }

  async updatePatient(patient: Patient) {
    await setDoc(doc(this.firestore, `patients/${patient.patientId}`), patient);
  }

  getPatient(id: string): Observable<Patient> {
    return docData(doc(this.firestore, `patients/${id}`), {
      idField: 'patientId',
    }) as Observable<Patient>;
  }
}
