import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ShowsService {
  private showsUrl = 'https://rest.bandsintown.com/artists/built%20to%20spill/events?app_id=js_www.builttospill.com';

  shows;

  constructor(private http: Http) { }

  getShows(): Observable<any> {
    if (!this.shows) {
      return this.http.get(this.showsUrl)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return Observable.of(this.shows);
    }
  }

  private extractData(res: Response) {
    const response = res.json();
    console.log('response', response);
    this.shows = response;
    return response || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
