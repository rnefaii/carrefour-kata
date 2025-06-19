import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeasingContractRoutingModule } from './leasing-contract-routing.module';
import { LeasingContractComponent } from './leasing-contract.component';
import { LeasingContractListComponent } from './pages/leasing-contract-list/leasing-contract-list.component';
import { LeasingContractCreateComponent } from './pages/leasing-contract-create/leasing-contract-create.component';
import { LeasingContractEditComponent } from './pages/leasing-contract-edit/leasing-contract-edit.component';
import { LeasingContractDetailComponent } from './pages/leasing-contract-detail/leasing-contract-detail.component';


@NgModule({
  declarations: [
    LeasingContractComponent,
    LeasingContractListComponent,
    LeasingContractCreateComponent,
    LeasingContractEditComponent,
    LeasingContractDetailComponent
  ],
  imports: [
    CommonModule,
    LeasingContractRoutingModule
  ]
})
export class LeasingContractModule { }
