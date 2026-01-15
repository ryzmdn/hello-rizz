import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { App } from '@/app';
import { routes } from '@/app.routes';
import { SeoService } from '@/core/services/seo/seo';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    SeoService,
  ],
}).catch((err) => console.error(err));
