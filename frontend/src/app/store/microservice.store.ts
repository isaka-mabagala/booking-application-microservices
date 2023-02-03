import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Customer, Microservice } from '../models/microservice';
import { LocalStorageService } from '../services/local-storage.service';

/**
 * [store interfaces]
 */
export const initialState = {
  isLogin: false,

  user: {
    firstName: '',
    lastName: '',
    email: '',
    custNumber: '',
  },
};
export interface MicroserviceState {
  microservice: Microservice;
}

@Injectable()
export class MicroserviceStore extends ComponentStore<MicroserviceState> {
  constructor(private localStorageService: LocalStorageService) {
    // initial state value
    super({ microservice: initialState });

    // add existing data from local storage
    this.localStorageService.getItem('microservice').then((res) => {
      if (res) {
        this.updateState(<Microservice>res);
      }
    });

    // save new state to local storage
    this.appState$.subscribe((res) => {
      this.localStorageService.setItem('microservice', res.microservice);
      // console.log(res.microservice);
    });
  }

  /**
   * [store selectors]
   */
  appState$: Observable<MicroserviceState> = this.select((state) => state);

  microservice$: Observable<Microservice> = this.select(
    (state) => state.microservice
  );

  isLogin$: Observable<boolean> = this.select(
    (state) => state.microservice.isLogin
  );

  user$: Observable<Customer> = this.select((state) => state.microservice.user);

  /**
   * [store updaters]
   */
  updateState = this.updater((state, microservice: Microservice) => ({
    ...state,
    microservice,
  }));

  setIsLogin = this.updater((state, status: boolean) => {
    const microserviceCopy = state.microservice;
    microserviceCopy.isLogin = status;

    return {
      ...state,
      microservice: microserviceCopy,
    };
  });

  setUser = this.updater((state, detail: Customer) => {
    const microserviceCopy = state.microservice;
    microserviceCopy.user = detail;

    return {
      ...state,
      microservice: microserviceCopy,
    };
  });
}
