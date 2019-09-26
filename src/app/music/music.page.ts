import { Component, OnInit } from '@angular/core';
import { MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  constructor(private musicService: MusicService) { }
  albums = [];

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albums = this.musicService.albums;
  }

}
