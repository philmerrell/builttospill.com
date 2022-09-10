import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Show, ShowsService } from './shows.service';

@Component({
  selector: 'app-shows-page',
  templateUrl: './shows.page.html',
  styleUrls: ['./shows.page.scss'],
})
export class ShowsPage implements OnInit {
  shows$: Observable<Show[]>;

  constructor(private showsService: ShowsService) { }

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.shows$ = this.showsService.getShows();
  }

}
