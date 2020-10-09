import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PillsboxindexPageRoutingModule } from './pillsboxindex-routing.module';

import { PillsboxindexPage } from './pillsboxindex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PillsboxindexPageRoutingModule
  ],
  declarations: [PillsboxindexPage]
})
export class PillsboxindexPageModule {}
