import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private showsUrl = 'https://rest.bandsintown.com/artists/built%20to%20spill/events?app_id=js_www.builttospill.com';
  private shows = [];

  constructor(private http: HttpClient) { }

  getShows(): Observable<any> {
    if (!this.shows.length) {
      return this.http.get(this.showsUrl)
        .pipe(
          map(this.extractData)
        );
    } else {
      return of(this.shows);
    }
  }

  private extractData = (res: Response[]) => {
    // console.log('response', response);
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
