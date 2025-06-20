import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from 'src/app/core/services/car.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/core/models/customer.model';
import { Contract } from 'src/app/core/models/contract.model';
import {LeasingContractService} from "../../../../core/services/leasing-contract.service";
import {Car} from "../../../../core/models/car.model";

@Component({
  selector: 'app-leasing-contract-edit',
  templateUrl: './leasing-contract-edit.component.html',
  styleUrls: ['./leasing-contract-edit.component.scss']
})
export class LeasingContractEditComponent implements OnInit {
  contractForm!: FormGroup;
  cars: Car[] = [];
  customers: Customer[] = [];
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeasingContractEditComponent>,
    private carService: CarService,
    private customerService: CustomerService,
    private contractService: LeasingContractService,
    @Inject(MAT_DIALOG_DATA) public data: { contract: Contract }
  ) {}

  ngOnInit(): void {
    this.contractForm = this.fb.group({
      carId: [this.data.contract.carId, Validators.required],
      customerId: [this.data.contract.customerId, Validators.required],
      startDate: [this.data.contract.startDate, Validators.required],
      endDate: [this.data.contract.endDate],
      dailyRate: [this.data.contract.dailyRate, Validators.required],
      active: [this.data.contract.active]
    });

    this.carService.getAllCars().subscribe(cars => (this.cars = cars));
    this.customerService.getAllCustomers().subscribe(customers => (this.customers = customers));
  }

  onSubmit(): void {
    if (this.contractForm.invalid) return;
    this.isSubmitting = true;
    const updatedContract = { ...this.data.contract, ...this.contractForm.value };
    this.contractService.updateContract(updatedContract).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.error = 'Failed to update contract';
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
