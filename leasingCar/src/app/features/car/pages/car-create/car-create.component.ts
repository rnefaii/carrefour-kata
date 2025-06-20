import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/core/services/car.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss']
})
export class CarCreateComponent {
  carForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private dialogRef: MatDialogRef<CarCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      available: [true]
    });
  }

  onSubmit(): void {
    if (this.carForm.invalid) return;

    this.isSubmitting = true;
    this.carService.createCar(this.carForm.value).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.error = 'Failed to create car';
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
