import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogged: boolean;

  constructor(
    private accountService: AccountService) 
    {
      if (localStorage.getItem("user")) {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    }

    // TODO: ngDoCheck()

  onLogout(): void {
    this.accountService.logout();
  }

  ngOnInit(): void {
  }

}
