import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Client } from 'src/app/client/class/client';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  modal: boolean = false

  constructor() { }

  openModal() {
    this.modal = true
  }

  closeModal() {
    this.modal = false
  }
}
