import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  /**
   * It injects the paginator in component client
   */
  @Input() paginator: any;
  listPages: number[];
  from: number;
  to: number;


  constructor() { }

  ngOnInit(){
    this.initPaginator()
  }

  /**
   * ngOnChanges(): Este hook se llama al inicio y cada vez que Angular detecta un cambio en los inputs del componente
   * (cuando tienes algún property binding). Recibe como parámetro un objeto SimpleChanges, con los valores actuales y anteriores (si había) de los inputs.
   * In this case, we find a binding between client compnent and the current one, so due to ngOnInit only refresh the page one time, we should use this
   * ngOnChanges to detect if there is any change
  */
  ngOnChanges(changes : SimpleChanges) {

    //If there is a previous value in paginator, it means we need to refresh the value again with ngOnChanges
    if(changes['paginator'].previousValue) {
      this.initPaginator()
    }    
  }

    /**
    * Range paginator (quantity of number pages that are displayed)
    */
  private initPaginator() {
    this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5)
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6)
    if (this.paginator.totalPages > 5) {
      this.listPages = new Array(this.to - this.from).fill(0).map((value, index) => index + this.from)
    } else {
      this.listPages = new Array(this.paginator.totalPages).fill(0).map((value, index) => index + 1)
    }
  }
}

