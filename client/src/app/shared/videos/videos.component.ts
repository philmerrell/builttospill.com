import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../player/player.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit, OnDestroy {
  @Input() videos;
  sub: Subscription;
  currentVideo;


  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getCurrentTrack();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCurrentTrack() {
    this.sub = this.playerService.getCurrentVideoObservable()
      .subscribe((video) => this.currentVideo = video);
  }

  playVideo(event, video, videos, expanded) {
    event.preventDefault();
    this.playerService.playThis(video, videos, expanded);
  }



}
