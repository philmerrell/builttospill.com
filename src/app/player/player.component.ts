import { Component, OnInit } from '@angular/core';
import { PlayerService, Video } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  currentVideo: Video;
  expanded = false;
  playerHeight = 74;
  playerWidth = 100;
  player;
  ytEvent;

  constructor(
    private playerService: PlayerService) { }

  ngOnInit() {
    this.getVideo();
  }

  onStateChange(event) {
    this.ytEvent = event.data;
    // Video has ended..
    if (this.ytEvent === 0) {
      this.playerService.initNextVideo(this.currentVideo);
      // this.player.loadVideoById(this.currentVideo.id);
    }
    if (this.ytEvent === 5) {
      this.playVideo();
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
    console.log(player.target);
    this.playerService.setPlayer(player.target);
    // console.log(player);
    this.player = player.target;
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
    this.expanded = false;
    this.playerHeight = 74;
    this.playerWidth = 100;
  }

  maximizePlayer() {
    this.expanded = true;
    this.playerHeight = 200;
    this.playerWidth = 300;
  }

  toggleSize() {
    if (this.expanded) {
      this.minimizePlayer();
    } else {
      this.maximizePlayer();
    }
  }


}
