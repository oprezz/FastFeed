import { Component, OnInit } from '@angular/core';
import { User } from '../../classes';
import { AccountService, AlertService } from '../../services';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  selectedFile: File = null;

  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    ) {
      this.accountService.user.subscribe(x => this.user = x);
      console.log("profile user:", this.user);
    }


  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user')).user;
  }
  
 
}
