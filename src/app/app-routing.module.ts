import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./views/gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./views/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'houses',
    loadChildren: () => import('./views/houses/houses.module').then( m => m.HousesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
