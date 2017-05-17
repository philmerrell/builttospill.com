import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos;

  constructor(
    private videoService: VideoService,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.getMusicVideos();
  }

  getMusicVideos() {
    this.videoService.getMusicVideos()
      .subscribe(videos => this.videos = videos);
  }

  playVideo(event, video) {
    event.preventDefault();
    this.playerService.playThis(video);
  }

}
