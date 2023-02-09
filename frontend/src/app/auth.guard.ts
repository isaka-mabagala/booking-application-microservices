import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.localStorageService.getItem('microservice').then(async (res) => {
      const accessToken = await this.localStorageService.getItem('token');

      if (res) {
        if (!res.isLogin) {
          this.router.navigate(['/']);
        } else if (this.isTokenExpired(accessToken)) {
          await this.localStorageService.removeItem('microservice');
          await this.localStorageService.removeItem('token');
          window.location.reload();
        }
      } else {
        this.router.navigate(['/']);
      }
    });

    return true;
  }

  private isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
