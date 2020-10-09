import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'prospectos',
    loadChildren: () => import('./prospectos/prospectos.module').then( m => m.ProspectosPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'pillsboxindex',
    loadChildren: () => import('./pillsboxindex/pillsboxindex.module').then( m => m.PillsboxindexPageModule)
  },
  {
    path: 'pillsboxcontent/:id',
    loadChildren: () => import('./pillsboxcontent/pillsboxcontent.module').then( m => m.PillsboxcontentPageModule)
  },
  {
    path: 'infomedicine/:idmedicine',
    loadChildren: () => import('./infomedicine/infomedicine.module').then( m => m.InfomedicinePageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
