import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PillsboxindexPage } from './pillsboxindex.page';

const routes: Routes = [
  {
    path: '',
    component: PillsboxindexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PillsboxindexPageRoutingModule {}
