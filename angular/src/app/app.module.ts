import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OurGoalComponent } from './components/our-goal/our-goal.component';
import { WeatherComponent } from './components/weather/weather.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { WeatherAPIService } from './services/weather-api.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    OurGoalComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WeatherAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
