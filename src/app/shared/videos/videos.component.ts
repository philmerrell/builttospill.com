import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../player/player.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  @Input() videos;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {}

  playVideo(event, video, videos, expanded) {
    event.preventDefault();
    this.playerService.playThis(video, videos, expanded);
  }

}
