import { Component, OnInit } from '@angular/core';
import { User } from '../../classes';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')).user;
    console.log("user:", this.user);
  }
}
