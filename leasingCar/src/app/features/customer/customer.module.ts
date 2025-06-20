import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
