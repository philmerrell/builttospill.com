import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video } from '../player/player.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  getHomeVideos() {
    return of([
      {
        id: '0hgRgO5y0f4',
        song: 'Living Zoo',
        album: 'Untethered Moon',
        type: 'Music Video'
      },
      {
        id: 'LZ1VqwPmKkw',
        song: 'Never Be The Same',
        album: 'Untethered Moon',
        type: 'Music Video'
      },
      {
        id: 'dMKtB6sMg7Y',
        song: 'Live on KEXP',
        album: 'KEXP',
        type: 'Live'
      },
      {
        id: 'IYf3tAtktD8',
        song: 'Hindsight',
        album: 'There Is No Enemy',
        type: 'Music Video'
      }
    ]);
  }

  getMusicVideos() {
    return of([
      {
        id: '0hgRgO5y0f4',
        song: 'Living Zoo',
        album: 'Untethered Moon',
        type: 'Music Video'
      },
      {
        id: 'LZ1VqwPmKkw',
        song: 'Never Be The Same',
        album: 'Untethered Moon',
        type: 'Music Video'
      },
      {
        id: 'IYf3tAtktD8',
        song: 'Hindsight',
        album: 'There Is No Enemy',
        type: 'Music Video'
      },
      {
        id: 'mFIBwS0GVX0',
        song: 'Conventional Wisdom',
        album: 'You In Reverse',
        type: 'Music Video'
      },
      {
        id: 'f7ysRps-iYA',
        song: 'Big Dipper',
        album: 'There\'s Nothing Wrong With Love',
        type: 'Music Video'
      },
      {
        id: 'AVtskhcGOtc',
        song: 'Car',
        album: 'There\'s Nothing Wrong With Love',
        type: 'Music Video'
      },
      {
        id: 'HJCC3QPtv5o',
        song: 'In The Morning',
        album: 'There\'s Nothing Wrong With Love',
        type: 'Music Video'
      },
      {
        id: 'Lg-m-7FkjVA',
        song: 'Fling',
        album: 'There\'s Nothing Wrong With Love',
        type: 'Music Video'
      },
      {
        id: 'dMKtB6sMg7Y',
        song: 'Live on KEXP',
        album: 'KEXP',
        type: 'Live'
      },
      {
        id: 'JlQzc9OoFMo',
        song: 'Stage On Sixth (Austin, TX)',
        album: 'Paste Magazine',
        type: 'Live'
      },
      {
        id: 'NGQXhJu5VUU',
        song: 'Jokerman',
        album: 'A Tribute To Bob Dylan In The 80s: Volume One',
        type: 'Covers'
      },
      {
        id: 'lK0um80hMAk',
        song: 'How Soon is Now?',
        album: 'The Smiths',
        type: 'Covers'
      },
      {
        id: 'VyeugwJQgw4',
        song: 'Age of Consent',
        album: 'Joy Division',
        type: 'Covers'
      },
      {
        id: 'YxXcK1zRfNw',
        song: 'Tarpit',
        album: 'Dinosaur Jr.',
        type: 'Covers'
      },
      {
        id: 'iHgw7U8eRho',
        song: 'TV Commercial',
        album: 'There is No Enemy',
        type: 'Other'
      }
    ]);
  }

}
