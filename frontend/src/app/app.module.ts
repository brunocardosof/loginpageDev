import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material';

import { DataTablesModule } from 'angular-datatables';
import { OAuthModule } from 'angular-oauth2-oidc';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { JwtInterceptorService } from './infra/service/jwt-interceptor.service';
import { PrincipalComponent } from './components/principal/principal.component';
import { IndexComponent } from './components/index/index.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, AuthenticationComponent, PrincipalComponent, IndexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    DataTablesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    OAuthModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
