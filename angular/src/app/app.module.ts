import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { LoginPage } from './login-page/login-page.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { Routes, RouterModule } from "@angular/router";

import { HttpClientModule } from '@angular/common/http';
import { ComponentNameComponent } from './component-name/component-name.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'register',
    component: InputUserDataFormComponent
  },
  {
    path: 'user/:uid',
    component: DisplayUserDataComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InputUserDataFormComponent,
    LoginPage,
    DisplayUserDataComponent,
    ComponentNameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
