import { Component } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private oauthService: OAuthService){
    this.configure();
  }
  
  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}

export const authConfig: AuthConfig = {
 
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',
 
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
 
  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: '438889821282-s2gikmn1bn0j1vn127d2hkgu5qbo94aq.apps.googleusercontent.com',
 
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: '4Us95FlIN2zPpmF-B_Xk4aj0',

  strictDiscoveryDocumentValidation: false

}
