import { Component, OnInit, Input } from '@angular/core';
import { PlayerService, Video } from './player.service';
import { WindowService } from './window.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-player',
  templateUrl: './player-alt.component.html',
  styleUrls: ['./player.component.css'],
  animations: [
    trigger('playerState', [
      state('expanded', style({
        top: '0',
        height: '200px',
        width: '300px'
      })),
      state('minimized',   style({
        bottom: '0',
        height: '64px',
        width: '100px',
      })),
      transition('expanded => minimized', animate('300ms ease-in')),
      transition('minimized => expanded', animate('300ms ease-out'))
    ])
  ]
})
export class PlayerComponent implements OnInit {
  @Input() nav;
  currentVideo: Video;
  playerSize = 'expanded';
  playerHeight = '200';
  playerWidth = '300';
  player;
  ytEvent;

  constructor(
    private playerService: PlayerService,
    private windowService: WindowService,
    public media: ObservableMedia ) { }

  ngOnInit() {
    this.getVideo();
  }

  onStateChange(event) {
    this.ytEvent = event.data;
    // console.log(this.ytEvent);
    // Video has ended..
    if (this.ytEvent === 0) {
      this.playerService.initNextVideo(this.currentVideo);
      // this.player.loadVideoById(this.currentVideo.id);
    }
  }

  getVideo() {
    this.playerService.getVideo()
      .subscribe(video => {
        // console.log(video);
        if (video.id) {
          this.currentVideo = video;
        }
      });
  }

  setPlayer(player) {
    this.playerService.setPlayer(player);
    // console.log(player);
    this.player = player;
  }

  toggleVideo() {
    if (this.ytEvent === 1) {
      this.pauseVideo();
    }
    if (!this.ytEvent || this.ytEvent === 2) {
      this.playVideo();
    }
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  minimizePlayer() {
    this.playerSize = 'minimized';
    this.player.setSize(100, 74);
  }

  maximizePlayer() {
    this.playerSize = 'expanded';
    this.player.setSize(300, 200);
  }

  toggleSize() {
    if (this.playerSize === 'expanded') {
      this.minimizePlayer();
    } else {
      this.maximizePlayer();
    }
  }


}
