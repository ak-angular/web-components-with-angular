# Web Components in Angular
This document is written based on Angular 9, if there is any change in further versions, please check the documentations.

## Setup

### Create your basic Angular app
create a basic angular app using `ng` cli command. 
Open terminal and run: `ng new app-name` and do the standar procedure to set it up.

### Add Angular Elements Package
This step will enable your angular setup to make angular components

```shell
ng add @angular/Elements
```

And then we would require to import the module to `app.module.ts`. Lets do it like this:
```js
import { createCustomElement } from '@angular/elements';
```

### App Module - Remove App Based Config
Since plan is to build web components, not to have an angular app, lets remove the app related configurations in entry file.


* Lets not import app-component. So, remove below line:

	`import { AppComponent } from './app.component';`

* Since, app component is not imported now, lets not even declare it. So, Remove `AppComponent` from `declarations` under `@NgModule`
* Also, we do not need to bootstrap the app, so remove below line under `@ngModule`:
	`bootstrap: [AppComponent]`

### Remove app.component files
Since we do not need the app component files (and we deleted the refernce of it in app.modile.ts), lets remove them from the project directory. So delete below files:

* app.component.html
* app.component.scss
* app.component.ts
* app.component.specs.ts


### Export Web Components for outer world
Time to make our custom web components and expose them for outer world. So, in `app.module.ts`, lets change `AppModule` class as below:

```js
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
  	
  	// Note: my custom component are "MyCustomComponentExample1" and "MyCustomComponentExample2"
  	// you can have your own
  	
    const myCustomComponentExample1 = createCustomElement(MyCustomComponentExample1, {injector: this.injector});
    customElements.define('my-custom-component-example1', myCustomComponentExample1);
    
    const myCustomComponentExample2 = createCustomElement(MyCustomComponentExample2, {injector: this.injector});
    customElements.define('my-custom-component-example2', myCustomComponentExample2);
  }
 }
```

a better way to do it would be, to have all the element reference in an object and loop it to do repeatative work:

```js
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

      // Register the custom element with the browser
      customElements.define(name, el);
    }
    
  }
}
```
now if you add more web components to project, you just need to add it into the object, and rest of the code will do the work.


## Build Process Changes
By default, when angular builds the app for production, it creates a lot of JS files with **hashed** names. examples:

* `main-es5.f28dfeb2f255b19efa0b.js`
* `runtime-es5.c9afb3256f2870e161de.js`
* `scripts.10e531c1f6d1ca8d62c5.js`

Since, we would be using these files at many places, we can not keep this updating everytime. lets remove the hashing.

In the `package.json`, lets add nother command under `scripts`:

`"build-component": "ng build --prod --output-hashing=none"`

### Merge Output JS files into one
If you want, you can merge all the output files into one to save the HTTP hits and be not bothered about copying multiples JS files while using these web components.

Create a js file and call it `build-bundle.js` in the root directory of the setup (on exact location where you have your `package.json`.

And using some file system npm packages, we will merge all js files into one. Paste the below code into the JS file:

```js
const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        './dist/web-components/runtime-es2015.js',
        './dist/web-components/runtime-es5.js',
        './dist/web-components/polyfills-es5.js',
        './dist/web-components/polyfills-es2015.js',
        './dist/web-components/main-es2015.js',
        './dist/web-components/main-es5.js'
    ];

    await fs.ensureDir('web-components');
    await concat(files, 'dist/web-components/ng-elements.js');
})();
```

Now lets add this to npm build process. so, open package.json and change the build script to below:

`"build-component": "ng build --prod --output-hashing=none && node build-bundle.js"`

And after that, when you build your code, it will make one JS file with name `ng-elements.js` under `dist` folder which you can use to import angular web components.

### Output
Checkout [/dist/web-components/index.html](/dist/web-components/index.html) directory for output


---
---


## Angular Base Build Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

