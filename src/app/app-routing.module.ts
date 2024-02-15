import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./views/gallery/gallery.module').then((m) => m.GalleryPageModule),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./views/customers/customers.module').then(
        (m) => m.CustomersPageModule
      ),
  },
  {
    path: 'houses',
    loadChildren: () =>
      import('./views/houses/houses.module').then((m) => m.HousesPageModule),
  },
  {
    path: 'houses/:id',
    loadChildren: () =>
      import('./views/house/house.module').then((m) => m.HousePageModule),
  },
  {
    path: 'customers/:id',
    loadChildren: () =>
      import('./views/customer/customer.module').then(
        (m) => m.CustomerPageModule
      ),
  },
  {
    path: '',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
