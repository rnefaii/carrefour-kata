import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'customer', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) }, { path: 'car', loadChildren: () => import('./features/car/car.module').then(m => m.CarModule) }, { path: 'leasing-contract', loadChildren: () => import('./features/leasing-contract/leasing-contract.module').then(m => m.LeasingContractModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
