# Web Components in Angular
This document is written based on Angular 9, if there is any change in further versions, please check the documentations.

## Add Angular Elements Package
This step will enable your angular setup to make angular components

```shell
ng add @angular/Elements
```

And then we would require to import the module to `app.module.ts`. Lets do it like this:
```js
import { createCustomElement } from '@angular/elements';
```

## App Module - Remove App Based Config
Since plan is to build web components, not to have an angular app, lets remove the app related configurations in entry file.


* Lets not import app-component. So, remove below line:

	`import { AppComponent } from './app.component';`

* Since, app component is not imported now, lets not even declare it. So, Remove `AppComponent` from `declarations` under `@NgModule`
* Also, we do not need to bootstrap the app, so remove below line under `@ngModule`:
	`bootstrap: [AppComponent]`


## Export Web Components for outer world
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


## Build Process Changes
By default, when angular builds the app for production, it creates a lot of JS files with **hashed** names. examples:

* `main-es5.f28dfeb2f255b19efa0b.js`
* `runtime-es5.c9afb3256f2870e161de.js`
* `scripts.10e531c1f6d1ca8d62c5.js`

Since, we would be using these files at many places, we can not keep this updating everytime. lets remove the hashing.

In the `package.json`, lets add nother command under `scripts`:

`"build-component": "ng build --prod --output-hashing=none"`

**NOTE:** We can also, merge all these files into one, and for that, we need to write another script.
