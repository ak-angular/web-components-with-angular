import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

// import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    // AppComponent,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
  	
  	// Convert `RegisterFormComponent` to a custom element.
    const registerFormComponent = createCustomElement(RegisterFormComponent, {injector: this.injector});
    
    // Register the custom element with the browser.
    customElements.define('register-form', registerFormComponent);
    
  	// Convert `LoginFormComponent` to a custom element.
    const loginFormComponent = createCustomElement(LoginFormComponent, {injector: this.injector});
    
    // Register the custom element with the browser.
    customElements.define('login-form', loginFormComponent);
  }
}
