import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BookingComponent } from './components/booking/booking.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageGuard } from './page.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerLoginComponent,
    canActivate: [PageGuard],
  },
  {
    path: 'register',
    component: CustomerRegisterComponent,
    canActivate: [PageGuard],
  },
  {
    path: 'dashboard',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
