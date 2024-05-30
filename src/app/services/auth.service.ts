import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { addDoc, collection } from 'firebase/firestore';
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
  userNameCollection: string = 'users';
  historyLoginNameCollection: string = 'loginHistory';
  role: string = '';

  constructor() {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      this.role = savedRole;
    }
  }

  login(email: string, password: string, role: string): Observable<void> {
    this.role = role;
    localStorage.setItem('role', this.role);
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    localStorage.removeItem('role');
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
  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => user !== null));
  }
  getIsAdmin(): boolean {
    return this.role == 'admin';
  }
}
