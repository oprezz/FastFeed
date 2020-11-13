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
import { GreetingsPageComponent } from './components/greetings-page/greetings-page.component';
import { AlertComponent } from './components/alert';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { WeatherAPIService } from './services/weather-api.service';
import { AccountModule } from './account/account.module';
import { AccountRoutingModule } from './account/account-routing.module'
import { FlexLayoutModule } from '@angular/flex-layout';

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
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AccountModule, 
    AccountRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    WeatherAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
