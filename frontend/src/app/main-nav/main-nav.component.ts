import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import { MicroserviceStore } from '../store/microservice.store';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  isLogin$: Observable<boolean> = this.microserviceStore.isLogin$;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  navMenuList = [
    { name: 'Login', path: '/', show: this.isLogin$, isProtected: false },
    {
      name: 'Register',
      path: '/register',
      show: this.isLogin$,
      isProtected: false,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      show: this.isLogin$,
      isProtected: true,
    },
    {
      name: 'Bookings',
      path: '/booking',
      show: this.isLogin$,
      isProtected: true,
    },
    {
      name: 'Reviews',
      path: '/review',
      show: this.isLogin$,
      isProtected: true,
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private microserviceStore: MicroserviceStore,
    private localStorageService: LocalStorageService
  ) {}

  logout(): void {
    this.localStorageService.removeItem('microservice');
    this.localStorageService.removeItem('token');
    window.location.reload();
  }
}
