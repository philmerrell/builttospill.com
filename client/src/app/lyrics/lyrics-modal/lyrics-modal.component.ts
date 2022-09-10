import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lyrics-modal',
  templateUrl: './lyrics-modal.component.html',
  styleUrls: ['./lyrics-modal.component.scss'],
})
export class LyricsModalComponent implements OnInit {
  @Input() track;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

}
