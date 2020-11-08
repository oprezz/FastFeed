import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const serviceUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '0de7a1a8bc076bb0d54b5fbf6975f444';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  load(city: string) {
    return this.http.get(serviceUrl + '?q=' + city + '&APPID=' + apiKey);
  }
  // tslint:disable-next-line:typedef
  getIconUrl(icon: string) {
    return 'http://openweathermap.org/img/w/' + icon + '.png';
  }
}
