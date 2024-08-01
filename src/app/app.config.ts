import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { InterceptorService } from './lib/auth/interceptor.service';
import { authGuardGuard } from './lib/guards/auth.guard';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      })
    ),
    // provideRouter(
    //   withGuards([authGuardGuard])
    // ),
    provideHttpClient(withInterceptors([InterceptorService])),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    PdfJsViewerModule,
  ],
};
