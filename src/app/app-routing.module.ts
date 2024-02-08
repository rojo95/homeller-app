import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'houses',
    pathMatch: 'full'
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
  {
    path: 'houses/:id',
    loadChildren: () => import('./views/house/house.module').then( m => m.HousePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
