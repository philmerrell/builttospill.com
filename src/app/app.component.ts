import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    this.scrollToTop();
  }

  /**
   * This method ensures the app scrolls to the top when routing to new views.
   * */
  private scrollToTop(): void {
    this.router.events
      .subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        document.body.scrollTop = 0;
      });
  }


}
