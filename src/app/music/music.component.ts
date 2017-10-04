import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { routerAnimation } from '../router-animation';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  animations: [ routerAnimation() ],
  host: {'[@routerAnimation]': ''}
})

export class MusicComponent implements OnInit {
  public albums;

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albums = this.musicService.albums;
    console.log(this.albums);
  }

}
