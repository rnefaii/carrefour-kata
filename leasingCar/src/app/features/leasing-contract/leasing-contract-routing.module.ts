import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeasingContractComponent } from './leasing-contract.component';
import {LeasingContractDetailComponent} from "./pages/leasing-contract-detail/leasing-contract-detail.component";
import {LeasingContractEditComponent} from "./pages/leasing-contract-edit/leasing-contract-edit.component";
import {LeasingContractCreateComponent} from "./pages/leasing-contract-create/leasing-contract-create.component";
import {LeasingContractListComponent} from "./pages/leasing-contract-list/leasing-contract-list.component";

const routes: Routes = [
  { path: '', component: LeasingContractListComponent },
  { path: 'create', component: LeasingContractCreateComponent },
  { path: 'edit/:id', component: LeasingContractEditComponent },
  { path: 'detail/:id', component: LeasingContractDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeasingContractRoutingModule { }
