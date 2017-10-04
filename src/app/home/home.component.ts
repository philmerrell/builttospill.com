import { Component, OnInit } from '@angular/core';
import { routerAnimation } from '../router-animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
