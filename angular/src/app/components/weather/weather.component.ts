import { Component, OnInit } from '@angular/core';
import { Weather } from '../../classes/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather = {
    city: 'Los Angeles',
    conditions: 'Sunny',
    temperature: 70,
    icon: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

}
