// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './material-module';


// Services
import { WeatherAPIService } from './services/weather-api.service';
import { DayService, AgendaService, ICalendarImportService } from '@syncfusion/ej2-angular-schedule';
import { AccountService, AlertService } from './services';
import { CalendarService } from './services';
// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OurGoalComponent } from './components/our-goal/our-goal.component';
import { WeatherComponent } from './components/weather/weather.component';
import { GreetingsPageComponent } from './components/greetings-page/greetings-page.component';
import { AlertComponent } from './components/alert';
import { BusinessComponent } from './components/business/business.component';
import { CarrierComponent } from './components/carrier/carrier.component';
import { FaqComponent } from './components/faq/faq.component';

import { AccountModule } from './account/account.module';
import { AccountRoutingModule } from './account/account-routing.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferencesComponent } from './components/preferences/preferences.component';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    OurGoalComponent,
    WeatherComponent,
    GreetingsPageComponent,
    AlertComponent,
    CalendarComponent,
    FoodDetailsComponent,
    ProfileComponent,
    PreferencesComponent,
    BusinessComponent,
    CarrierComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AccountModule,
    AccountRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    // Calendar modules
    ScheduleModule,
    UploaderModule,
    ButtonModule,
    ContextMenuModule
  ],
  entryComponents: [PreferencesComponent],
  providers: [
    // Weather API services
    WeatherAPIService,
    // Calendar services
    DayService,
    AgendaService,
    ICalendarImportService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }},
    AccountService,
    AlertService,
    CalendarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
