import { Component } from '@angular/core';
import { User } from './classes';
import { AccountService } from './services';
import {CalendarService} from './services/calendar.service';
import {Calendar} from './classes/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  user: User;
  calendar: Calendar;

  constructor(private accountService: AccountService, private calendarService: CalendarService) {
    this.accountService.user.subscribe(x => this.user = x);
    this.calendarService._Calendar.subscribe(x => this.calendar = x);
  }

  logout () {
    this.accountService.logout();
  }
}
