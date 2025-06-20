import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarCreateComponent } from './pages/car-create/car-create.component';
import { CarEditComponent } from './pages/car-edit/car-edit.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../../shared/shared.module";


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
        SharedModule,
        CarRoutingModule
    ]
})
export class CarModule { }
