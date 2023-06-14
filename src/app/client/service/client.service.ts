import { Injectable } from '@angular/core';
import { Client } from '../class/client';
import { CLIENTS } from '../json/clients.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  /**
     * Get the data json from client.json.ts file
     * @Observable It becomes the data in an observable, it makes the dates reactive and asinchronous
     */
  getClients() : Observable<Client[]>{
    return of(CLIENTS)
  }
}
