import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/core/models/customer.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from "@angular/material/dialog";
import {CustomerCreateComponent} from "../customer-create/customer-create.component";
import {CustomerEditComponent} from "../customer-edit/customer-edit.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialog} from "../../../../shared/confirm.dialog";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'phone', 'driverLicenseNumber', 'active', 'actions'];
  dataSource = new MatTableDataSource<Customer>();
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CustomerService, private router: Router,
              private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load customers';
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCustomer(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this customer?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.customerService.deleteCustomer(id).subscribe({
          next: () => {
            this.snackBar.open('Customer deleted successfully', 'Close', { duration: 3000 });
            this.loadCustomers(); // recharger la liste
          },
          error: () => {
            this.snackBar.open('Failed to delete customer', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  goToEdit(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      width: '600px',
      data: {
        customer: customer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCustomers();
      }
    });
  }

  createNew(): void {
      const dialogRef = this.dialog.open(CustomerCreateComponent, {
        width: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadCustomers();
        }
      });
  }
}
