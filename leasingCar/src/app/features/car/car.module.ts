import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarCreateComponent } from './pages/car-create/car-create.component';
import { CarEditComponent } from './pages/car-edit/car-edit.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';


@NgModule({
  declarations: [
    CarComponent,
    CarListComponent,
    CarCreateComponent,
    CarEditComponent,
    CarDetailComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule
  ]
})
export class CarModule { }
