import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class PlayerService {
  playlist: Video[] = this.getUntetheredMoon();
  currentVideo: BehaviorSubject<any> = new BehaviorSubject(this.playlist[0]);
  expanded: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
    this.expanded.next(expanded);
    this.zone.runOutsideAngular(() => {
      this.player.loadVideoById(video.id);
    });
  }

getVideoExpandedObservable() {
  return this.expanded.asObservable();
}

  getCurrentVideoObservable() {
    return this.currentVideo.asObservable();
  }

  getUntetheredMoon() {
    return [
      {
        id: 'JTWH5rq9DGc',
        song: 'Gonna Lose',
        album: 'When the Wind Forgets Your Name',
        time: '2:45'
      },
      {
        id: 'qsOaFwyu2L0',
        song: 'Fool\'s Gold',
        album: 'When the Wind Forgets Your Name',
        time: '4:02'
      },
      {
        id: 'uUe_aMhk128',
        song: 'Understood',
        album: 'When the Wind Forgets Your Name',
        time: '4:03'
      },
      {
        id: 'HaXPw4CTQRA',
        song: 'Elements',
        album: 'When the Wind Forgets Your Name',
        time: '5:49'
      },
      {
        id: 'SdAIOdpqEV8',
        song: 'Rocksteady',
        album: 'When the Wind Forgets Your Name',
        time: '5:17'
      },
      {
        id: 'UaPabFClWVo',
        song: 'Spiderweb',
        album: 'When the Wind Forgets Your Name',
        time: '5:24'
      },
      {
        id: 'kgAQ-GxeehE',
        song: 'Never Alright',
        album: 'When the Wind Forgets Your Name',
        time: '4:51'
      },
      {
        id: 'rbXNHAc54hM',
        song: 'Alright',
        album: 'When the Wind Forgets Your Name',
        time: '5:00'
      },
      {
        id: 'oLzRKmKaoU4',
        song: 'Comes a Day',
        album: 'When the Wind Forgets Your Name',
        time: '8:27'
      }
        ];
  }

}

export class Video {
  id: string;
  song: string;
  album: string;
}
