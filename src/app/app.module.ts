import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { HttpClientModule  } from '@angular/common/http';
import { ViewComponentsModule } from './view-components/view-components.module';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
import { VarningOsparatDataGuard } from './services/varning-osparat-data.guard';
registerLocaleData(localeSv);
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './services/cache-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ViewsModule,
    RouterModule,
    ViewComponentsModule,
    AppRoutingModule
  ],
  providers: [{ provide:  LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'sv-SE' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor, multi: true
    },
    VarningOsparatDataGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
