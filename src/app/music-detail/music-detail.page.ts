import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicService } from '../music/music.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.page.html',
  styleUrls: ['./music-detail.page.scss'],
})
export class MusicDetailPage implements OnInit, OnDestroy {

  album;
  albums = [];
  private sub: any;
  mobileStyle;

  constructor(
    private musicService: MusicService,
    // private playerService: PlayerService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       const id = params.id;
       console.log(id);
       this.albums = this.musicService.albums;
       this.album = this.albums.filter(album => album.id === id)[0];
       console.log(this.album, this.albums);
       this.mobileStyle = this.sanitizer.bypassSecurityTrustStyle('url(' + this.album.image.url + ')');
    });

  }

  // playVideo(event, video, videos) {
  //   event.preventDefault();
  //   this.playerService.playThis(video, videos);
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
