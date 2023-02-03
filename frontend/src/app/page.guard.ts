import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MicroserviceStore } from './store/microservice.store';

@Injectable({
  providedIn: 'root',
})
export class PageGuard implements CanActivate {
  constructor(
    private microserviceStore: MicroserviceStore,
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
    this.microserviceStore.isLogin$.subscribe((res) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });

    return true;
  }
}
