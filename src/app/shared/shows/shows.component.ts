import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../../shows/shows.service';
// import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit {
  @Input() shows: Show[];
  @Input() limit;
  // faTicket = faTicketAlt;
  constructor() { }

  ngOnInit() {}

}
