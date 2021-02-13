import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Show {
  datetime: string;
  venue: any;
  offers: any;
  
}

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private showsUrl = 'https://rest.bandsintown.com/artists/built%20to%20spill/events?app_id=js_www.builttospill.com';
  private shows: Show[] = [];

  constructor(private http: HttpClient) { }

  getShows(): Observable<Show[]> {
    if (!this.shows.length) {
      return this.http.get<Show[]>(this.showsUrl)
        .pipe(
          map(this.extractData)
        );
    } else {
      return of(this.shows);
    }
  }

  private extractData = (res: Show[]) => {
    // console.log('response', res);
    this.shows = res;
    return this.shows || [];
  }
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    // let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
    //   errMsg = error.message ? error.message : error.toString();
    // }
    // console.error(errMsg);
    // return Observable.throw(errMsg);
  }
}
