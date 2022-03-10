import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth) {}

  login(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      () => {
        return true;
      },
      (error) => {
        console.error(error);
        return false;
      }
    );
  }

  getCurrentUser(): User | null{
    return getAuth().currentUser;
  }

  logout() {
    signOut(this.auth);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
}
