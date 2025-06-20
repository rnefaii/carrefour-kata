import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialog} from "../../../../shared/confirm.dialog";
import {CarService} from "../../../../core/services/car.service";
import {Car} from "../../../../core/models/car.model";
import {CarEditComponent} from "../car-edit/car-edit.component";
import {CarCreateComponent} from "../car-create/car-create.component";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  displayedColumns: string[] = ['brand', 'model', 'available', 'actions'];
  dataSource = new MatTableDataSource<Car>();
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private carService: CarService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load cars';
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCar(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this car?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carService.deleteCar(id).subscribe({
          next: () => {
            this.snackBar.open('Car deleted successfully', 'Close', { duration: 3000 });
            this.loadCars(); // recharger la liste
          },
          error: () => {
            this.snackBar.open('Failed to delete car', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  goToEdit(car: Car): void {
    const dialogRef = this.dialog.open(CarEditComponent, {
      width: '600px',
      data: {
        car: car
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCars();
      }
    });
  }

  createNew(): void {
    const dialogRef = this.dialog.open(CarCreateComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCars();
      }
    });
  }

}
