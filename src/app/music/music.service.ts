import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MusicService {
  albums;

  constructor() {
    this.setAlbums();
  }

  getAlbums() {
    return Observable.of(this.albums);
  }

  setAlbums() {
    this.albums = [
      {
        title: 'Untethered Moon',
        artworkUrl: 'assets/albums/untethered-moon.jpg',
        releaseDate: '2015-04-18',
        tracks: [
          {
            id: 'tnq1OrbwHt4',
            song: 'All Our Songs',
            album: 'Untethered Moon',
            time: '6:15'
          },
          {
            id: '0hgRgO5y0f4',
            song: 'Living Zoo',
            album: 'Untethered Moon',
            time: '4:22'
          },
          {
            id: 'g1MELddKYLo',
            song: 'On The Way',
            album: 'Untethered Moon',
            time: '4:25'
          },
          {
            id: 'GNrCAInNPA8',
            song: 'Some Other Song',
            album: 'Untethered Moon',
            time: '4:26'
          },
          {
            id: 'LZ1VqwPmKkw',
            song: 'Never Be The Same',
            album: 'Untethered Moon',
            time: '3:15'
          },
          {
            id: 'CJVOXVzLGMk',
            song: 'C.R.E.B',
            album: 'Untethered Moon',
            time: '4:21'
          },
          {
            id: 'G9qEs5bxCkA',
            song: 'Another Day',
            album: 'Untethered Moon',
            time: '3:10'
          },
          {
            id: '9YGMrGyMuRQ',
            song: 'Horizon To Cliff',
            album: 'Untethered Moon',
            time: '2:44'
          },
          {
            id: 'yq-KnD7ln2I',
            song: 'So',
            album: 'Untethered Moon',
            time: '4:28'
          },
          {
            id: '0lk2-Zx_0jQ',
            song: 'When I\'m Blind',
            album: 'Untethered Moon',
            time: '8:23'
          }
        ]
      }
    ];
  }

}
