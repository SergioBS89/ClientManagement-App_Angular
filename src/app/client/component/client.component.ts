import { Component, OnInit } from '@angular/core';
import { Client } from '../class/client';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService : ClientService){}


  clientList :Client[]  

    
  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      client => this.clientList = client
    )
  }


}
