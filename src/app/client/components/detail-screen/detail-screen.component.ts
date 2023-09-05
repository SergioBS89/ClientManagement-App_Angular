import { Component, Input } from '@angular/core';
import { Client } from '../../class/client';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ClientService } from '../../service/client.service';
import { DetailService } from './service/detail.service';

@Component({
  selector: 'app-detail-screen',
  templateUrl: './detail-screen.component.html',
  styleUrls: ['./detail-screen.component.css']
})
export class DetailScreenComponent {

  @Input()
  client: Client = new Client()
  @Input()
  display: boolean

  title = "Client Details"
  fileSelected: File
  progressBar: number = 0

  constructor(private clientService: ClientService, private detailService: DetailService) { }

  ngOnInit(): void {
    this.client = this.client
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
    console.log(this.client)
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
          if (event.type === HttpEventType.UploadProgress) {
            this.progressBar = Math.round((event.loaded / event.total) * 100)
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body
            response.client = this.client as Client      
            Swal.fire(
              'Uploading file',
              response.message,
              'success').then(function(){
                window.location.reload()
              })
          }
        }
        )
    }
  }

  closeModal() {
    this.progressBar = 0
  }
}



