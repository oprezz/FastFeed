import { Component, OnInit } from '@angular/core';
import { User } from '../../classes';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  user: User;
  
  max = 10;
  min = 0;
  step = 1;
  value = 5;
  tickInterval = 1;
  showTicks = true;
  thumbLabel = true;
  
  constructor() { }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.tickInterval;
    }
    return 0;
  }
  

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')).user;
  }

}
