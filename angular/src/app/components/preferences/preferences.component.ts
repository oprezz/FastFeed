import { Component, OnInit } from '@angular/core';
import { User } from '../../classes';
import { UserPreferences } from '../../classes'
import { MatSliderChange } from '@angular/material/slider';
import { AccountService, AlertService } from '../../services';
import { first } from 'rxjs/operators';

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
  value_restaurantorder = 5;
  value_cashcard = 5;
  value_fastfoodfinedine = 5;
  tickInterval = 1;
  showTicks = true;
  thumbLabel = true;
    
  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) { }


  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.tickInterval;
    }
    return 0;
  }
  

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')).user;
    this.value_restaurantorder = this.user.preferences.restaurantPref;
    this.value_cashcard = this.user.preferences.cashPref;
    this.value_fastfoodfinedine = this.user.preferences.fastfoodPref;
  }

  SliderChanges(): void {
    console.log("changed!");
    this.user.preferences.restaurantPref = this.value_restaurantorder;
    this.user.preferences.orderPref = this.max - this.value_restaurantorder;
    
    this.user.preferences.cashPref = this.value_cashcard;
    this.user.preferences.cardPref = this.max - this.value_cashcard;
    
    this.user.preferences.fastfoodPref = this.value_fastfoodfinedine;
    this.user.preferences.finedinePref = this.max - this.value_fastfoodfinedine;
    // localStorage.setItem('user', JSON.stringify(this.user));
  }

  onSubmit() {
    this.SliderChanges();
    console.log("user", this.user);
    this.accountService.updateuserdata(this.user)
    .pipe(first())
    .subscribe({
        next: () => {
            this.alertService.success('Saved successfully', { keepAfterRouteChange: true });
        },
        error: error => {
            this.alertService.error(error);
        }
    });;
  }
}
