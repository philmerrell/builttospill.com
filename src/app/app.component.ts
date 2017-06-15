import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    this.scrollToTop();

     $('masthead').visibility({
        once: false,
        onBottomPassed: function() {
          // $('.fixed.menu').transition('fade in');
          $('.top.inverted.fixed.menu').removeClass('transparent-menu');

        },
        onBottomPassedReverse: function() {
          $('.top.inverted.fixed.menu').addClass('transparent-menu');
        }
      })
    ;
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
