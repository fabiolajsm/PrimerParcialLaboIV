import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC6VYBVoWyBWhh6wMmUaMfkTUIbXBNwnss',
  authDomain: 'primerparciallaboiv-28155.firebaseapp.com',
  projectId: 'primerparciallaboiv-28155',
  storageBucket: 'primerparciallaboiv-28155.appspot.com',
  messagingSenderId: '64929727083',
  appId: '1:64929727083:web:929a9632b355854eba672e',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
