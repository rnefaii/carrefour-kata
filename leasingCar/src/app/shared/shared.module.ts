import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ConfirmDialog} from "./confirm.dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  MatChipsModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatOptionModule,
  MatSelectModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [ConfirmDialog],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...materialModules],
  exports: [ConfirmDialog, CommonModule, FormsModule, ReactiveFormsModule, ...materialModules],
})
export class SharedModule {}
