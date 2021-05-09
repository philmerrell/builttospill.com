import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LyricsPageRoutingModule } from './lyrics-routing.module';

import { LyricsPage } from './lyrics.page';
import { LyricsModalComponent } from './lyrics-modal/lyrics-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LyricsPageRoutingModule
  ],
  declarations: [LyricsPage, LyricsModalComponent]
})
export class LyricsPageModule {}
