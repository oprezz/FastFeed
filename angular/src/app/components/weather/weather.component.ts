import { Component, OnInit } from '@angular/core';

import { Weather } from '../../classes/weather';
import { WeatherAPIService } from '../../services/weather-api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather = new Weather();

  constructor(private weatherService: WeatherAPIService) { }

  ngOnInit(): void {
    this.weatherService.load('Budapest').subscribe(data => {
      this.weather.city = data['name'];
      this.weather.conditions = data['weather'][0]['main'];
      this.weather.temperature = Math.round((data['main']['temp'] - 273.15) * 1.8);
      this.weather.icon = this.weatherService.getIconUrl(data['weather'][0]['icon']);
    });
  }

}
