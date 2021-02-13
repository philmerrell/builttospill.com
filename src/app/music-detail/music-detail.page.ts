import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicService } from '../music/music.service';
import { PlayerService } from '../player/player.service';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.page.html',
  styleUrls: ['./music-detail.page.scss'],
})
export class MusicDetailPage implements OnInit, OnDestroy {

  private sub: Subscription;
  album;
  albums = [];
  currentVideo;
  mobileStyle;
  randomProduct1;
  randomProduct2;
  randomProduct3;
  

  constructor(
    private musicService: MusicService,
    private playerService: PlayerService,
    private productsService: ProductsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       const id = params.id;
       this.albums = this.musicService.albums;
       this.album = this.albums.filter(album => album.id === id)[0];
       this.mobileStyle = this.sanitizer.bypassSecurityTrustStyle('url(' + this.album.image.url + ')');
    });
    this.getRandomProducts();
    this.getCurrentTrack();
  }

  ngOnDestroy(...args: []) {
    this.sub.unsubscribe();
  }

  getCurrentTrack() {
    this.sub = this.playerService.getCurrentVideoObservable()
      .subscribe((video) => this.currentVideo = video);
  }

  async getRandomProducts() {
    this.randomProduct1 = await this.productsService.getRandomProduct();
    this.randomProduct2 = await this.productsService.getRandomProduct();
    this.randomProduct3 = await this.productsService.getRandomProduct();
  }

  playVideo(event, video, videos) {
    event.preventDefault();
    this.playerService.playThis(video, videos, false);
  }

}
