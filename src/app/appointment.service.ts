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
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private firestore: Firestore) {}

  public async addAppointment(appointment: Appointment) {
    try {
      const docRef = await addDoc(
        collection(this.firestore, 'appointments'),
        appointment
      );
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  getAppointments(): Observable<Appointment[]> {
    return collectionData(collection(this.firestore, 'appointments'), {
      idField: 'appointmentId',
    }) as Observable<Appointment[]>;
  }

  async deleteAppointment(id: string) {
    await deleteDoc(doc(this.firestore, `appointments/${id}`));
  }

  async updateAppointment(appointment: Appointment) {
    await setDoc(doc(this.firestore, `appointments/${appointment.appointmentId}`), appointment);
  }

  getAppointment(id: string): Observable<Appointment> {
    return docData(doc(this.firestore, `appointments/${id}`), {
      idField: 'appointmentId',
    }) as Observable<Appointment>;
  }
}
