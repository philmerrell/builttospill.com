import { Component, OnInit } from '@angular/core';
import { ShowsService } from './shows.service';
import { routerAnimation } from '../router-animation';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class ShowsComponent implements OnInit {
  shows;
  showsLoading = true;

  constructor(private showsService: ShowsService) { }

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.showsService.getShows()
      .subscribe(shows => {
        this.shows = shows;
        this.showsLoading = false;
        console.log(shows);
      });
  }

}
