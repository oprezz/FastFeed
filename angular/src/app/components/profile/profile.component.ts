import { Component, OnInit } from '@angular/core';
import { User } from '../../classes';
import { AccountService, AlertService } from '../../services';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private accountService: AccountService,
    ) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')).user;
  }
}
