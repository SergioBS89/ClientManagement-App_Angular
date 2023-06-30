import { Component, OnInit } from '@angular/core';
import { Client } from '../class/client';
import { ClientService } from '../service/client.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
  ) {}

  clientList: Client[];
  client: Client = new Client();

  ngOnInit(): void {
    this.clientService
      .getClients()
      .subscribe((client) => (this.clientList = client));
  }

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
        this.service.delete(client.id).subscribe((response) => {
          this.clientList = this.clientList.filter((cli) => cli !== client);
          Swal.fire(
            'Deleted!',
            `Client ${client.name} has been deleted`,
            'success'
          );
        });
      }
    });
  }
}
