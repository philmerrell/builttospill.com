import { Component, OnInit } from '@angular/core';
import { routerAnimation } from '../router-animation';
import { MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})
export class MusicComponent implements OnInit {
  albums;
  showAllAlbums = true;
  albumDetail;

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albums = this.musicService.albums;
  }

  hideDetail() {
    this.showAllAlbums = true;
  }

  showAlbumDetail(album, event) {
    event.preventDefault();
    this.albumDetail = album;
    this.showAllAlbums = false;
  }

}
