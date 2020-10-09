import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PillsboxcontentPageRoutingModule } from './pillsboxcontent-routing.module';

import { PillsboxcontentPage } from './pillsboxcontent.page';
import { GuardarMedicacionComponent } from './components/guardar-medicacion/guardar-medicacion.component';

@NgModule({
  entryComponents: [ // Ventana modal
    GuardarMedicacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PillsboxcontentPageRoutingModule
  ],
  declarations: [PillsboxcontentPage, GuardarMedicacionComponent]
})
export class PillsboxcontentPageModule {}
