import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { routerAnimation } from '../../router-animation';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MusicService } from '../music.service';
import { PlayerService } from '../../player/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class MusicDetailComponent implements OnInit, OnDestroy {
    album;
    albums = [];
    mobileStyle;
    private sub: any;

    constructor(
      public media: ObservableMedia,
      private sanitizer: DomSanitizer,
      private musicService: MusicService,
      private playerService: PlayerService,
      private route: ActivatedRoute) { }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         const id = params['id'];
         this.albums = this.musicService.albums;
         this.album = this.albums.filter(album => album.id === id)[0];
         this.mobileStyle = this.sanitizer.bypassSecurityTrustStyle('url(' + this.album.image.url + ')');

      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
