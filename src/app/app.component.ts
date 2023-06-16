import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  login: boolean = true
  animation: boolean = true

  hideImg(){
    let img : HTMLElement = document.getElementById('image')
    if(this.login == true){
      img.classList.toggle('quadrado')
    }
    if(this.animation){
      setTimeout(() => {
        //Ocultar el div
        img.style.visibility = "hidden"
      }, 2900);
    }
  }
}
