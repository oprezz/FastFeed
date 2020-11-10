// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
// Services
import { WeatherAPIService } from './services/weather-api.service';
import { DayService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OurGoalComponent } from './components/our-goal/our-goal.component';
import { WeatherComponent } from './components/weather/weather.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    OurGoalComponent,
    WeatherComponent,
    CalendarComponent,
    FoodDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Calendar modules
    ScheduleModule
  ],
  providers: [
    // Weather API services
    WeatherAPIService,
    // Calendar services
    DayService,
    AgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
