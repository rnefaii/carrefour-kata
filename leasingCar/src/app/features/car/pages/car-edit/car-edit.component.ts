import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarService } from 'src/app/core/services/car.service';
import { Car } from 'src/app/core/models/car.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {
  carForm!: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private dialogRef: MatDialogRef<CarEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car }
  ) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      brand: [this.data.car.brand, Validators.required],
      model: [this.data.car.model, Validators.required],
      available: [this.data.car.available]
    });
  }

  onSubmit(): void {
    if (this.carForm.invalid) return;

    this.isSubmitting = true;
    const updatedcar = { ...this.data.car, ...this.carForm.value };
    this.carService.updateCar(updatedcar.id, updatedcar.available).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.error = 'Failed to update car';
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
