import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {

  constructor(
    private router: Router
  ){

  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }
}
