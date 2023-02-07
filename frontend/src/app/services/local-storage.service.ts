import { Injectable } from '@angular/core';
import * as localForage from 'localforage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    localForage.config({
      driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
      name: 'Project-19',
      version: 1.0,
      size: 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
      description: 'Microservice data store',
    });
  }

  getItem(item: string): Promise<any> {
    return localForage.getItem(item);
  }

  async setItem(item: string, value: any) {
    await localForage.setItem(item, value).then((res) => res);
  }

  async removeItem(item: string) {
    await localForage.removeItem(item);
  }
}
