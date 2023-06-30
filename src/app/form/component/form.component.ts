import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/client/class/client';
import { ClientService } from 'src/app/client/service/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  constructor(
    private service: ClientService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  client: Client = new Client();
  formTitle: String = 'Creating client';

  ngOnInit() {
    this.loadClient();
  }

  create() {
    console.log(this.client);
    this.service.createClient(this.client).subscribe((response) => {
      this.router.navigate(['/clients']);
      Swal.fire(
        'New client',
        `Client ${this.client.name} created sucessfully`,
        'success'
      );
    });
  }

  loadClient() {
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.service.getClientById(id).subscribe((response) => {
          this.client = response;
        });
      }
    });
  }

  update() {
    this.service.updateClient(this.client).subscribe((response) => {
      this.router.navigate(['/clients']);
      Swal.fire(
        'Client Updated',
        `Client ${this.client.name} has been updated`,
        'success'
      );
    });
  }
}
