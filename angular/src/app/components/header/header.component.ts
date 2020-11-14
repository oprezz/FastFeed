import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { User } from '../../classes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userLogged: boolean;

  private homepage: string;

  user: User;

  constructor(
    private accountService : AccountService,
    private router: Router) 
    {
      this.accountService.user.subscribe(x => this.user = x);
    }


  onLogout(): void {
    this.accountService.logout();
  }

  ngOnInit(): void {
  }

  onLogoClick(): void {
    console.log("clicked! userlogged:", this.user);
    if (this.user){
      this.homepage = "/dashboard";
    } else {
      this.homepage = '/greetings/register';
    }
    this.router.navigate([this.homepage]);
  }
}
