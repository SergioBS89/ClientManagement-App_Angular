import { Injectable } from '@angular/core';
import { Client } from '../class/client';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Enpoint get list of clients
   */
  private endpoint = 'http://localhost:8080/api'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  getClients(page : number): Observable<any> {
    /* There are two ways to get an observable from the api:
    Option 1:                                                          
    return this.http.get<Client[]>(this.findAllEnpoint)
    Option 2:                                             */
    return this.http
      .get(this.endpoint + '/pages/' + page)
      .pipe(
        map((response : any) => {
          /**
           * Way to set some values dinamically, pagination
           */
          (response.content as Client[]).map(client => {
            client.name = client.name.toUpperCase()
            client.createAt = formatDate(client.createAt, 'dd/MM/yyyy', 'en-US')
            return client
          })
          return response
        }));
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.endpoint, client, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (e.error.errors) {
          return throwError(() => e);
        }
        console.log(e.error.message)
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  getClientById(id): Observable<Client> {
    console.log(`${this.endpoint}/${id}`)
    return this.http.get<Client>(`${this.endpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients'])
        console.log(e.error.message)
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.endpoint}/${client.id}`, client, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (e.error.errors != null) {
          return throwError(() => e);
        }
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.endpoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        this.router.navigate(['/clients'])
        console.log(e.error.message)
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  uploadFile(file : File, id) : Observable<HttpEvent<{}>>{
    let formData = new FormData()
    //Those two values should be equals in back end (form data values)
    formData.append("file", file)
    formData.append("id", id)

    //Managing the progress % uploading files
    const req = new HttpRequest('POST', `${this.endpoint}/files`, formData,{
      reportProgress: true
    })

    return this.http.request(req)
  }
}
