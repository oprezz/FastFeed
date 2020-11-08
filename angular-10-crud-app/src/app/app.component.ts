import { Component } from '@angular/core';
import { AccountService } from './services'
import { User } from './models'

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular10Crud';

  user: User;
  constructor(private accountService : AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout () {
    this.accountService.logout();
  }
}
