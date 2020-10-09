import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfomedicinePage } from './infomedicine.page';

const routes: Routes = [
  {
    path: '',
    component: InfomedicinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfomedicinePageRoutingModule {}
