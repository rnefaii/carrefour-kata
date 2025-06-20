import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerEditComponent} from "./pages/customer-edit/customer-edit.component";
import {CustomerCreateComponent} from "./pages/customer-create/customer-create.component";
import {CustomerListComponent} from "./pages/customer-list/customer-list.component";

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'create', component: CustomerCreateComponent },
  { path: 'edit/:id', component: CustomerEditComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
