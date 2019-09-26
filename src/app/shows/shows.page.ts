import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowsService } from './shows.service';
import { faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shows-page',
  templateUrl: './shows.page.html',
  styleUrls: ['./shows.page.scss'],
})
export class ShowsPage implements OnInit {
  faMap = faMap;
  shows: Observable<any[]>;

  constructor(private showsService: ShowsService) { }

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.shows = this.showsService.getShows();
  }

}
