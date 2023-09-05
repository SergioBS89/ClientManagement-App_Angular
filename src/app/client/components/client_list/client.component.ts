import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientService } from '../../service/client.service';
import { Client } from '../../class/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private service: ClientService,
    private activeRoute: ActivatedRoute
  ) { }

  // client: Client = new Client();
  clientList: Client[];
  paginator: any
  clientSelected: Client
  modalActive: boolean = false

  ngOnInit(): void {
    /**
     * Pagination 
     */
    this.activeRoute.paramMap.subscribe(
      params => {
        let page: number = +params.get('page')
        !page ? 0 : page;
        this.clientService
          .getClients(page)
          .subscribe((response) => {
            this.clientList = response.content as Client[];
            this.paginator = response
          });
      })

      
      }
  
  /**
   * This funtion delete a client in DB
   * @param client 
   */
  delete(client: Client) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(client.id).subscribe(() => {
          //Chacking if is client in list clients 
          this.clientList = this.clientList.filter((clientRemoved) => clientRemoved !== client);
          Swal.fire(
            'Deleted!',
            `Client ${client.name} has been deleted`,
            'success'
          );
        });
      }
    });
  }

  openModal(client : Client){
   this.clientSelected = client
  }

}
