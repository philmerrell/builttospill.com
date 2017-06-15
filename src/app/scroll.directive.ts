import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor(el: ElementRef) { 

    
  }

  // track($event: Event) {
  //   if($event.target['scrollingElement'].scrollHeight > 100) {
  //     console.log('show menu', $event);
  //   }
    // console.debug("Scroll Event", $event);
  // }

}
