import { Component, OnInit } from '@angular/core';
import { routerAnimation } from '../router-animation';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class ShowsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
