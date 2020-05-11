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
  	
  	// Note: my custom component are "MyCustomComponentExample1" and "MyCustomComponentExample2"
  	// you can have your own
  	
    const registerFormComponent = createCustomElement(RegisterFormComponent, {injector: this.injector});
    customElements.define('register-form', registerFormComponent);
    
    const loginFormComponent = createCustomElement(LoginFormComponent, {injector: this.injector});
    customElements.define('login-form', loginFormComponent);
  }
}
