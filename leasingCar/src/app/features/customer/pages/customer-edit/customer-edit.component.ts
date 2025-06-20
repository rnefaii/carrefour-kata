import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/core/models/customer.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer }
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [this.data.customer.firstName, Validators.required],
      lastName: [this.data.customer.lastName, Validators.required],
      username: [this.data.customer.username, Validators.required],
      email: [this.data.customer.email, [Validators.required, Validators.email]],
      phone: [this.data.customer.phone],
      driverLicenseNumber: [this.data.customer.driverLicenseNumber, Validators.required],
      active: [this.data.customer.active]
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;

    this.isSubmitting = true;
    const updatedCustomer = { ...this.data.customer, ...this.customerForm.value };
    this.customerService.updateCustomer(updatedCustomer).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.error = 'Failed to update customer';
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
