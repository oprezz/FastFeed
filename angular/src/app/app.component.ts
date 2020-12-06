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
  title = 'FastFeed';

  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout () {
    this.accountService.logout();
  }
}
