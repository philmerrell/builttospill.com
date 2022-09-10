import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowsPageRoutingModule } from './shows-routing.module';

import { ShowsPage } from './shows.page';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ShowsPageRoutingModule
  ],
  declarations: [ShowsPage]
})
export class ShowsPageModule {}
