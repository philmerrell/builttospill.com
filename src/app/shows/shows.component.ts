import { Component, OnInit } from '@angular/core';
import { ShowsService } from './shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
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
