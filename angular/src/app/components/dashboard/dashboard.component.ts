import { Component, OnInit } from '@angular/core';
import { User } from '../../classes';
import { AccountService, AlertService  } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  

  ngOnInit(): void {
    this.alertService.clear();
  }

}
