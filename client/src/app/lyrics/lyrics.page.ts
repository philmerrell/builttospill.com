import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MusicService } from '../music/music.service';
import { LyricsModalComponent } from './lyrics-modal/lyrics-modal.component';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.page.html',
  styleUrls: ['./lyrics.page.scss'],
})
export class LyricsPage implements OnInit {

  constructor(private modalController: ModalController, private musicService: MusicService) { }
  albums;

  ngOnInit() {
    this.albums = this.musicService.getAlbums();
  }

  async viewLyrics(track) {
    const modal = await this.modalController.create({
      component: LyricsModalComponent,
      componentProps: {
        track
      }
    });
    modal.present();
  }





}
