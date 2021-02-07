import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { VideoService } from './video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

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

  playVideo(event, video, videos) {
    event.preventDefault();
    this.playerService.playThis(video, videos);
  }
}
