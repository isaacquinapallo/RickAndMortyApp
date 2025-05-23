import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FirebaseOptions } from 'firebase/app';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot(),
      FormsModule,
      ReactiveFormsModule
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig as FirebaseOptions)),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
