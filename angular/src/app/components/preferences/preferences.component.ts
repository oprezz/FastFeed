import { Component, OnInit } from '@angular/core';
import { User } from '../../classes';
import { UserPreferences } from '../../classes';
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
  vegetarian = false;
  vegan = false;
  paleo = false;
  lactose = false;
  gluten = false;
  nuts = false;
  coffee = false;
  
  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.accountService.user.subscribe(x => {
        this.user = x;
        this.loadUserParams();
    });
  }


  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.tickInterval;
    }
    return 0;
  }


  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user')).user;
  }

  loadUserParams(): void{
    this.value_restaurantorder = this.user.preferences.restaurantPref;
    this.value_cashcard = this.user.preferences.cashPref;
    this.value_fastfoodfinedine = this.user.preferences.fastfoodPref;
    this.vegetarian = this.user.preferences.specdiet.vegetarian;
    this.vegan = this.user.preferences.specdiet.vegan;
    this.paleo = this.user.preferences.specdiet.paleo;
    this.lactose = this.user.preferences.allergies.lactose;
    this.gluten = this.user.preferences.allergies.gluten;
    this.nuts = this.user.preferences.allergies.nuts;
    this.coffee = this.user.preferences.coffee;
  }

  SliderChanges(): void {
    console.log("changed!");
    this.user.preferences.restaurantPref = this.value_restaurantorder;
    this.user.preferences.orderPref = this.max - this.value_restaurantorder;

    this.user.preferences.cashPref = this.value_cashcard;
    this.user.preferences.cardPref = this.max - this.value_cashcard;

    this.user.preferences.fastfoodPref = this.value_fastfoodfinedine;
    this.user.preferences.finedinePref = this.max - this.value_fastfoodfinedine;
    this.user.preferences.coffee = this.coffee;
    // localStorage.setItem('user', JSON.stringify(this.user));
  }

  CheckBoxChanges(): void
  {
    this.user.preferences.allergies.gluten = this.gluten;
    this.user.preferences.allergies.lactose = this.lactose;
    this.user.preferences.allergies.nuts = this.nuts;

    this.user.preferences.specdiet.paleo = this.paleo;
    this.user.preferences.specdiet.vegan = this.vegan;
    this.user.preferences.specdiet.vegetarian = this.vegetarian;
  }

  onSubmit() {
    this.SliderChanges();
    this.CheckBoxChanges();
    console.log(this.coffee);
    console.log("user__:", this.user);
    this.accountService.updateuserdata(this.user)
    .subscribe({
        next: () => {
            this.alertService.success('Saved successfully!', { keepAfterRouteChange: true });
        },
        error: error => {
            this.alertService.error(error);
        }
    });
  }
}
