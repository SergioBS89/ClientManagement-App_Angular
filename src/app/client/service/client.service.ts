import { Injectable } from '@angular/core';
import { Client } from '../class/client';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  /**
   * Enpoint get list of clients
   */
  private endpointGetAll = 'http://localhost:8080/api/get';
  private enpointCreate = 'http://localhost:8080/api/post';
  private enpointUpdate = 'http://localhost:8080/api/put';
  private enpointDelete = 'http://localhost:8080/api/delete';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})


  getClients(): Observable<Client[]> {
    /* There are two ways to get an observable from the api:
    Option 1:                                                          
    return this.http.get<Client[]>(this.findAllEnpoint)
    Option 2:                                             */
    return this.http
      .get(this.endpointGetAll)
      .pipe(map((response) => response as Client[]));
  }

  createClient(client: Client) : Observable<Client>{
    return this.http.post<Client>(this.enpointCreate, client, {headers : this.httpHeaders})
  }

  getClientById(id) : Observable<Client>{
    return this.http.get<Client>(`${this.endpointGetAll}/${id}`)
  }

  updateClient(client: Client) : Observable<Client>{
    return this.http.put<Client>(`${this.enpointUpdate}/${client.id}`, client, {headers: this.httpHeaders})
  }

  delete(id:number) : Observable<Client>{
    return this.http.delete<Client>(`${this.enpointDelete}/${id}`, {headers: this.httpHeaders})
  }






  // PROBANDO OCULTAR COMPONENTE
  // login: boolean = true;
  // animation: boolean = true;

  // hideComponent() {
  //   let img: HTMLElement = document.getElementById('image');
  //   if (this.login == true) {
  //     img.classList.toggle('quadrado');
  //   }
  //   if (this.animation) {
  //     setTimeout(() => {
  //       //Ocultar el div
  //       img.style.visibility = 'hidden';
  //     }, 2900);
  //   }
  // }
}
