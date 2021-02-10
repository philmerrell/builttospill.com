import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  selectedPath = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
    .subscribe((event: RouterEvent) => {
      if(event instanceof NavigationEnd){
        this.selectedPath = event.url;
        console.log(event.url);
        // this.trackActiveTabPage(event.url);
      }
    })
  }

  

}
