import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { CarService } from 'src/app/core/services/car.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Car } from 'src/app/core/models/car.model';
import { Customer } from 'src/app/core/models/customer.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {LeasingContractService} from "../../../../core/services/leasing-contract.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-leasing-contract-create',
  templateUrl: './leasing-contract-create.component.html',
  styleUrls: ['./leasing-contract-create.component.scss']
})
export class LeasingContractCreateComponent implements OnInit {
  contractForm!: FormGroup;
  cars: Car[] = [];
  customers: Customer[] = [];
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private customerService: CustomerService,
    private contractService: LeasingContractService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<LeasingContractCreateComponent>
  ) {}

  ngOnInit(): void {
    this.contractForm = this.fb.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      dailyRate: ['', Validators.required, Validators.pattern(/^[1-9][0-9]*$/)],
      active: [true]
    }, {
      validators: this.startBeforeEndValidator
    });

    this.carService.getAllCars().subscribe(cars => (this.cars = cars));
    this.customerService.getAllCustomers().subscribe(customers => (this.customers = customers));
  }

  startBeforeEndValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if (start && end && new Date(start) > new Date(end)) {
      return { dateInvalid: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.contractForm.invalid) return;
    this.isSubmitting = true;
    this.contractService.createContract(this.contractForm.value).subscribe({
      next: () => {
        this.snackBar.open('Contract created successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.error = 'Failed to create contract';
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
