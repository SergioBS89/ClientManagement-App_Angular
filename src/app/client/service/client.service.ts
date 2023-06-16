import { Injectable } from '@angular/core';
import { Client } from '../class/client';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  /**
   * Enpoint get list of clients
   */
  private findAllEnpoint = "http://localhost:8080/api/list"
  /**
     * Get the data json from client.json.ts file
     * @Observable It becomes the data in an observable, it makes the dates reactive and asinchronous
     */
  getClients() : Observable<Client[]>{
    /* There are two ways to get an observable from the api:
    Option 1:                                                          
    return this.http.get<Client[]>(this.findAllEnpoint)
    Option 2:                                             */
    return this.http.get(this.findAllEnpoint).pipe(
      map(response => response as Client[])
    )
  }
}
