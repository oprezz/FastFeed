import { Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OurGoalComponent } from '../components/our-goal/our-goal.component';
//import { GreetingsPageComponent } from '../components/greetings-page/greetings-page.component';
import { LayoutComponent } from '../account/layout.component';
import { LoginComponent } from '../account/login.component';
import { RegisterComponent } from '../account/register.component';


export const routes: Routes = [
  {
   path: 'dashboard',
   component: DashboardComponent
 },
 {
   path: 'goals',
   component: OurGoalComponent
 },
 {
   path: '',
   redirectTo: '/#',
   pathMatch: 'full'
 }
];

