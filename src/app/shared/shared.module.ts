import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsComponent } from './shows/shows.component';
import { VideosComponent } from './videos/videos.component';
// import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ShowsComponent,
    VideosComponent
  ],
  imports: [
    CommonModule,
    // FontAwesomeModule,
    IonicModule

  ],
  exports: [
    ShowsComponent,
    VideosComponent,
    // FaIconComponent
  ]
})
export class SharedModule { }
