import { Component } from '@angular/core';
import { Client } from '../../class/client';
import { ClientService } from '../../service/client.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

  client: Client = new Client()
  title = "Client Details"
  fileSelected: File
  progressBar : number = 0

  constructor(private clientService: ClientService, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id')!
      if (id) {
        this.clientService.getClientById(id).subscribe((response) => {
          this.client = response;
          console.log(response)
        });
      }
    })
  }

  /**
   * 
   * @param event Get the file uplaoded 
   */
  selectFile(event) {
    this.fileSelected = event.target.files[0]
    this.progressBar = 0

    if (this.fileSelected.type.indexOf('image') < 0) {
      Swal.fire(
        'Select Image',
        'This file should be type image',
        'error'
      );
      this.fileSelected = null
    }
    console.log(this.fileSelected)
  }

  /**
   * Save in DB the file for the user with id passed by parameter
   */
  uploadFile() {
    //If there's no any file selected
    if (!this.fileSelected) {
      Swal.fire(
        'Error!',
        'Please, select a picture',
        'error'
      );
    } else {
      this.clientService.uploadFile(this.fileSelected, this.client.id)
        .subscribe(event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progressBar = Math.round((event.loaded/event.total) * 100)
          } else if(event.type === HttpEventType.Response){
            let response : any = event.body
            response.client = this.client as Client
            Swal.fire(
              'Uploading file',
              response.message,
              'success').then(function(){
                location.reload();
                })
          } 
          })
    }
  }
}
