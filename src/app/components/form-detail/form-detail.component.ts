import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
})
export class FormDetailComponent implements OnInit {
  transactionForm!: FormGroup;

  mockTransaction = {
    timestamp: 17123123123,
    name: 'John Doe',
    type: 'CREDIT',
    amount: 50000,
    status: 'SUCCESS',
    description: 'Monthly salary',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTransaction();
  }

  initializeForm(): void {
    this.transactionForm = this.fb.group({
      timestamp: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      type: [{ value: '', disabled: true }],
      amount: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      description: ['', Validators.required],
    });
  }

  loadTransaction(): void {
    this.transactionForm.patchValue(this.mockTransaction);
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const updatedTransaction = this.transactionForm.getRawValue();

    console.log('Submitted transaction:', updatedTransaction);

    alert('Transaction updated successfully');
    this.router.navigate(['']);
  }

  onCancel(): void {
    this.router.navigate(['']);
  }
}