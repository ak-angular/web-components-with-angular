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

    // list of components and element names of each
    const elements = {
      'register-form': RegisterFormComponent,
      'login-form': LoginFormComponent
    };

    // loop to create custom web components
    for (let name in elements) {
      const component = elements[name];

      // Convert component to a custom element.
      const el = createCustomElement(component, {injector: this.injector});

      // Register the custom element with the browser if does not exist
      customElements.get(name) || customElements.define(name, el);
    }
    
  }
}
