import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class PlayerService {
  playlist: Video[] = this.getUntetheredMoon();
  currentVideo: BehaviorSubject<any> = new BehaviorSubject(this.playlist[0]);

  private player;

  constructor(private zone: NgZone) {}

  setPlayer(player) {
    this.player = player;
  }

  setVideo(video: Video) {
    this.currentVideo.next(video);
  }

  getVideo() {
    return this.currentVideo.asObservable();
  }

  initNextVideo(video: Video) {
    const index = this.playlist.indexOf(video);
    console.log(this.playlist[index + 1]);
    if (index && this.playlist.length > (index + 1)) {
      this.setVideo(this.playlist[index + 1]);
      this.zone.runOutsideAngular(() => {
        this.player.loadVideoById(this.currentVideo.getValue().id);
        // this.player.playVideo();
      });
    }
  }

  playThis(video, playlist, expanded) {
    this.playlist = playlist;
    this.setVideo(video);
    this.zone.runOutsideAngular(() => {
      this.player.loadVideoById(video.id);
    });
  }

  getCurrentVideoObservable() {
    return this.currentVideo.asObservable();
  }

  getUntetheredMoon() {
    return [
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
        ];
  }

}

export class Video {
  id: string;
  song: string;
  album: string;
}
