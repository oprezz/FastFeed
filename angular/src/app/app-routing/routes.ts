import { Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OurGoalComponent } from '../components/our-goal/our-goal.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginPage
  // },
  // {
  //   path: 'register',
  //   component: InputUserDataFormComponent
  // },
  // {
  //   path: 'user/:uid',
  //   component: DisplayUserDataComponent
  // }
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
