import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideosPageRoutingModule } from './videos-routing.module';

import { VideosPage } from './videos.page';
import { VideoTypePipe } from './video-type.pipe';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VideosPageRoutingModule
  ],
  declarations: [VideosPage, VideoTypePipe]
})
export class VideosPageModule {}
