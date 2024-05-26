import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  userNameCollection: string = 'usuarios';
  historyLoginNameCollection: string = 'historialLogin';

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  getUsers(): Observable<[]> {
    const users = collection(this.firestore, this.userNameCollection);
    return collectionData(users) as Observable<[]>;
  }

  addToLoginHistory(email: string) {
    const loginHistory = collection(
      this.firestore,
      this.historyLoginNameCollection
    );
    addDoc(loginHistory, { email: email, date: new Date() });
  }
}
