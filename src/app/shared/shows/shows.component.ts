import { Component, OnInit, Input } from '@angular/core';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit {
  @Input() shows;
  @Input() limit;
  faTicket = faTicketAlt;
  constructor() { }

  ngOnInit() {}

}
