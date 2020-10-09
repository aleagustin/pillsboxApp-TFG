import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfomedicinePageRoutingModule } from './infomedicine-routing.module';

import { InfomedicinePage } from './infomedicine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfomedicinePageRoutingModule
  ],
  declarations: [InfomedicinePage]
})
export class InfomedicinePageModule {}
