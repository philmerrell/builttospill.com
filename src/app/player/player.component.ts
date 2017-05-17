import { Component, OnInit } from '@angular/core';
import { PlayerService, Video } from './player.service';
import { WindowService } from './window.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

declare const ramjet;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  animations: [
    trigger('playerState', [
      state('expanded', style({
        bottom: '76px',
        height: '200px',
        width: '300px'
      })),
      state('minimized',   style({
        bottom: '0',
        height: '74px',
        width: '100px',
      })),
      transition('expanded => minimized', animate('300ms ease-in')),
      transition('minimized => expanded', animate('300ms ease-out'))
    ])
  ]
})
export class PlayerComponent implements OnInit {
  currentVideo: Video;
  playerSize = 'expanded';
  playerHeight = '200';
  playerWidth = '300';
  private player;
  private ytEvent;

  constructor(
    private playerService: PlayerService,
    private windowService: WindowService ) { }

  ngOnInit() {
    this.getVideo();
  }

  onStateChange(event) {
    this.ytEvent = event.data;
    console.log(this.ytEvent);
    // Video has ended..
    if (this.ytEvent === 0) {
      this.playerService.initNextVideo(this.currentVideo);
      // this.player.loadVideoById(this.currentVideo.id);
    }
  }

  getVideo() {
    this.playerService.getVideo()
      .subscribe(video => {
        console.log(video);
        this.currentVideo = video;
        // this.player.loadVideoById(video.id);
        // this.player.cueVideoById(this.currentVideo.id);
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

    // const a = this.windowService.nativeWindow.getElementById('player-container');
    // const b = this.windowService.nativeWindow.getElementById('mini-player-container');
    // // set the stage so ramjet copies the right styles...
    // b.classList.remove('hidden');

    // ramjet.transform( a, b, {
    //   done: function () {
    //     // this function is called as soon as the transition completes
    //     b.classList.remove('hidden');
    //   }
    // });

    // // ...then hide the original elements for the duration of the transition
    // a.classList.add('hidden');
    // b.classList.add('hidden');
    // this.playerSize = 'mini';
  }

  maximizePlayer() {
    // const a = this.windowService.nativeWindow.getElementById('player-container');
    // const b = this.windowService.nativeWindow.getElementById('mini-player-container');
    // // set the stage so ramjet copies the right styles...
    // a.classList.remove('hidden');

    // ramjet.transform( b, a, {
    //   overrideClone: function (node, depth){
    //     if (node.nodeType === 1 && node.tagName === 'youtube-player') {
    //       return;
    //     }
    //     return node.cloneNode();
    //   },
    //   done: function () {
    //     // this function is called as soon as the transition completes
    //     a.classList.remove('hidden');
    //   }
    // });

    // // ...then hide the original elements for the duration of the transition
    // b.classList.add('hidden');
    // a.classList.add('hidden');
    // this.playerSize = 'max';
  }

  toggleSize() {
    if (this.playerSize === 'expanded') {
      this.playerSize = 'minimized';
      this.player.setSize(100, 74);
    } else {
      this.playerSize = 'expanded';
      this.player.setSize(300, 200);
    }
  }


}
