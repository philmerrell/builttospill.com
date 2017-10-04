
import { Injectable } from '@angular/core';

function _window(): any {
   // return the global native browser window object
   return document;
}

@Injectable()
export class WindowService {
   get nativeWindow() : any {
      return _window();
   }
}
