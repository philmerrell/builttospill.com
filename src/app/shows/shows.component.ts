import { Component, OnInit } from '@angular/core';
import { routerAnimation } from '../router-animation';
import { ShowsService } from './shows.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class ShowsComponent implements OnInit {
  shows = [];
  showsLoading = true;
  displayedColumns = ['date', 'venue', 'location', 'tickets'];
  dataSource: DataSource<any>;

  constructor(private showsService: ShowsService) { }

  ngOnInit() {
    // this.getShows();
    this.initDataSource();
  }

  initDataSource() {
    this.dataSource = new ShowsDataSource(this.showsService);
  }

  getShows() {
    this.showsService.getShows()
      .subscribe(shows => {
        this.shows = shows;
        this.showsLoading = false;
      });
  }
}

export class ShowsDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  constructor(private showsService: ShowsService) {
    super();
   }

  connect(): Observable<any[]> {
    return Observable.of([
      {
        datetime: '2017-11-1',
        venue: {
          name: 'Some Venue',
          city: 'Bonersville',
          region: 'Kentucky'
        }
      }
    ]);
    // return this.showsService.getShows();
  }

  disconnect() {}
}
