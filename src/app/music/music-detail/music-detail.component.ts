import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicService } from '../music.service';
import { PlayerService } from '../../player/player.service';
import { ActivatedRoute } from '@angular/router';
import { routerAnimation } from '../../router-animation';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class MusicDetailComponent implements OnInit {

  album;
  albums = [];
  private sub: any;

  constructor(
    private musicService: MusicService,
    private playerService: PlayerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       const id = params['id'];
       console.log(id);
       this.albums = this.musicService.albums;
       this.album = this.albums.filter(album => album.id === id)[0];
       console.log(this.album, this.albums);
    });
  }

  playVideo(event, video, videos) {
    event.preventDefault();
    this.playerService.playThis(video, videos);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
