import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';
import {CarListComponent} from "./pages/car-list/car-list.component";
import {CarCreateComponent} from "./pages/car-create/car-create.component";
import {CarEditComponent} from "./pages/car-edit/car-edit.component";
import {CarDetailComponent} from "./pages/car-detail/car-detail.component";

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'create', component: CarCreateComponent },
  { path: 'edit/:id', component: CarEditComponent },
  { path: 'detail/:id', component: CarDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
