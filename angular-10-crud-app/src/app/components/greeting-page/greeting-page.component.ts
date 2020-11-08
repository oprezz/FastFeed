import { Component } from '@angular/core';

const accountModule = () => import('../../account/account.module').then(x => x.AccountModule);

@Component({
  selector: 'app-greeting-page',
  templateUrl: './greeting-page.component.html',
  styleUrls: ['./greeting-page.component.css']
})
export class GreetingPageComponent {

  constructor() { }

}
