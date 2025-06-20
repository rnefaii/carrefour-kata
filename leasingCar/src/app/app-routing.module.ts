import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'customers', loadChildren: () => import('./features/customer/customer.module')
      .then(m => m.CustomerModule) }
  , { path: 'cars', loadChildren: () => import('./features/car/car.module')
      .then(m => m.CarModule) }
  , { path: 'contracts', loadChildren: () => import('./features/leasing-contract/leasing-contract.module')
      .then(m => m.LeasingContractModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
