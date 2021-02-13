import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MusicService } from '../music/music.service';
import { PlayerService } from '../player/player.service';
import { ProductsService } from '../shared/products.service';
import { ShowsService } from '../shows/shows.service';
import { VideosService } from '../videos/videos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  sub: Subscription;
  videos: Observable<any[]>;
  shows$: Observable<any[]>;
  album: Observable<any[]>;
  products = [];
  randomProduct1;
  randomProduct2;
  randomProduct3;
  randomProduct4;
  currentVideo;

  constructor(
    private videosService: VideosService,
    private showsService: ShowsService,
    private musicService: MusicService,
    private playerService: PlayerService,
    private productsService: ProductsService) {}

  ngOnInit() {
    this.getAlbum();
    this.getShows();
    this.getVideos();
    this.getProducts();
    this.getCurrentTrack();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCurrentTrack() {
    this.sub = this.playerService.getCurrentVideoObservable()
      .subscribe((video) => this.currentVideo = video);
  }

  getVideos() {
    this.videos = this.videosService.getHomeVideos();
  }

  getShows() {
    this.shows$ = this.showsService.getShows();
  }

  getAlbum() {
    this.album = this.musicService.albums[0];
  }

  async getProducts() {
    this.products = await this.productsService.getProducts();
    this.randomProduct1 = await this.productsService.getRandomProduct();
    this.randomProduct2 = await this.productsService.getRandomProduct();
    this.randomProduct3 = await this.productsService.getRandomProduct();
    this.randomProduct4 = await this.productsService.getRandomProduct();
  }

  playVideo(event, video, videos, expanded) {
    event.preventDefault();
    this.playerService.playThis(video, videos, expanded);
  }

}
