import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
})
export class FormDetailComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private csvService: CsvUploadService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDetailTransaction();
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

  loadDetailTransaction(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.csvService.getDetailTransactions(id).subscribe({
      next: (data) => {
        this.transactionForm.patchValue(data);
        if (data.type === 'CREDIT') {
          this.transactionForm.get('description')?.disable();
        } else {
          this.transactionForm.get('description')?.enable();
        }
      },
      error: (err) => {
        alert('Failed to load transaction detail: ' + err?.error?.Message || ' ');
        console.error('Failed to load transaction detail:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const updatedTransaction = this.transactionForm.getRawValue();
    const transactionId = updatedTransaction.timestamp;
    this.csvService
      .editTransaction(transactionId, updatedTransaction)
      .subscribe({
        next: () => {
          alert('Transaction updated successfully');
          this.router.navigate(['']);
        },
        error: (err) => {
          alert('Failed to update transaction: ' + err?.error?.Message || '');
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['']);
  }
}