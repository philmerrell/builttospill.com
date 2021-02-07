import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music/music.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.page.html',
  styleUrls: ['./music-detail.page.scss'],
})
export class MusicDetailPage implements OnInit, OnDestroy {
  album;
  albums = [];
  private sub: Subscription;
  mobileStyle;

  constructor(
    private musicService: MusicService,
    private playerService: PlayerService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       const id = params.id;
       this.albums = this.musicService.albums;
       this.album = this.albums.filter(album => album.id === id)[0];
       console.log(this.album, this.albums);
       this.mobileStyle = this.sanitizer.bypassSecurityTrustStyle('url(' + this.album.image.url + ')');
    });
  }

  ngOnDestroy(...args: []) {
    this.sub.unsubscribe();
  }

  playVideo(event, video, videos) {
    event.preventDefault();
    this.playerService.playThis(video, videos);
  }

}
