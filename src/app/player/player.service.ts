import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class PlayerService {
  playlist: Video[] = [
      {
        id: 'tnq1OrbwHt4',
        song: 'All Our Songs',
        album: 'Untethered Moon'
      },
      {
        id: '0hgRgO5y0f4',
        song: 'Living Zoo',
        album: 'Untethered Moon'
      }
    ];
  currentVideo: BehaviorSubject<Video> = new BehaviorSubject(this.playlist[0]);

  private player;

  constructor(private zone: NgZone) {}

  addToPlaylist(video: Video) {
    this.playlist.push(video);
  }

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
    // TODO: check to see if there are any more items ...
    this.setVideo(this.playlist[index + 1]);
    this.zone.runOutsideAngular(() => {
      this.player.loadVideoById(this.currentVideo.getValue().id);
    });
  }

  playThis(video) {
    this.setVideo(video);
    this.zone.runOutsideAngular(() => {
      this.player.loadVideoById(video.id);
    });
  }

  // cueVideo(video: Video) {
  //   this.addToPlaylist(video);
  //   this.initNextVideo(this.currentVideo.getValue());
  // }

}

export class Video {
  id: string;
  song: string;
  album: string;
}
