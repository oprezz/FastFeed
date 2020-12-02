import { Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OurGoalComponent } from '../components/our-goal/our-goal.component';
//import { GreetingsPageComponent } from '../components/greetings-page/greetings-page.component';
import { LayoutComponent } from '../account/layout.component';
import { LoginComponent } from '../account/login.component';
import { RegisterComponent } from '../account/register.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { FaqComponent } from '../components/faq/faq.component';
import { BusinessComponent } from '../components/business/business.component';
import { CarrierComponent } from '../components/carrier/carrier.component';


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
   path: 'faq',
   component: FaqComponent
 },
 {
  path: 'business',
  component: BusinessComponent
 },
 {
  path: 'carrier',
  component: CarrierComponent
 },
 {
  path: 'profile',
  component: ProfileComponent
 },
 {
   path: '',
   redirectTo: '/greetings/register',
   pathMatch: 'full'
 }
];

