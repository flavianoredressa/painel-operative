/// <reference types="@angular/localize" />

import { isDevMode } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { bootstrapApplication } from '@angular/platform-browser';
import { browserTracingIntegration, init } from '@sentry/angular-ivy';

import { environment } from '@environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

init({
  dsn: environment.sentryDsn,
  integrations: [browserTracingIntegration()],
  tracePropagationTargets: [environment.urlApi],
  tracesSampleRate: 1,
  beforeSend(event, hint) {
    if (isDevMode() && hint.originalException) {
      console.error(hint.originalException);
    }

    const FILTER_FIRE_ERRORS = ['auth/network-request-failed', 'auth/invalid-credential'];
    if (hint.originalException instanceof FirebaseError && FILTER_FIRE_ERRORS.includes(hint.originalException.code)) {
      return null;
    }

    return event;
  }
});

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
