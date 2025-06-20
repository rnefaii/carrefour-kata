import {Component, OnInit, ViewChild} from '@angular/core';
import { Customer } from 'src/app/core/models/customer.model';
import { Contract } from 'src/app/core/models/contract.model';
import {LeasingContractService} from "../../../../core/services/leasing-contract.service";
import {MatDialog} from "@angular/material/dialog";
import {LeasingContractCreateComponent} from "../leasing-contract-create/leasing-contract-create.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomerEditComponent} from "../../../customer/pages/customer-edit/customer-edit.component";
import {LeasingContractEditComponent} from "../leasing-contract-edit/leasing-contract-edit.component";
import {ConfirmDialog} from "../../../../shared/confirm.dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-leasing-contract-list',
  templateUrl: './leasing-contract-list.component.html',
  styleUrls: ['./leasing-contract-list.component.scss']
})
export class LeasingContractListComponent implements OnInit {
  dataSource = new MatTableDataSource<Customer>();
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private contractService: LeasingContractService, private dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadContracts()
  }

  loadContracts(){
    this.contractService.getAllContracts().subscribe({next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load contracts';
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToEdit(contract: Contract): void {
    const dialogRef = this.dialog.open(LeasingContractEditComponent, {
      width: '600px',
      data: {
        contract: contract
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContracts();
      }
    });
  }

  deleteCustomer(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this customer?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.contractService.deleteContract(id).subscribe({
          next: () => {
            this.snackBar.open('Contract deleted successfully', 'Close', { duration: 3000 });
            this.loadContracts();
          },
          error: () => {
            this.snackBar.open('Failed to delete contract', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  createNew(): void {
    const dialogRef = this.dialog.open(LeasingContractCreateComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContracts();
      }
    });
  }
}
