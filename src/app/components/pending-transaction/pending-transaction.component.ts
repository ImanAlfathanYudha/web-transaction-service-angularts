import { Component } from '@angular/core';
import { Transaction } from 'src/app/model/transaction.model';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrls: ['./pending-transaction.component.scss']
})
export class PendingTransactionComponent {
  pendingTransactions: Transaction[] = [];
  paginatedPendingTransactions: Transaction[] = [];
  pageSize = 5;
  currentPage = 1;
  constructor(private csvService: CsvUploadService) { }

  ngOnInit() {
    this.csvService.pendingTransaction$.subscribe(data => {
      this.pendingTransactions = (data || []).filter(
        t => t.status === 'PENDING'
      );
    });
    console.log('tes pendingTransactions comp ', this.pendingTransactions)
    this.paginateTransaction()
  }

  paginateTransaction() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedPendingTransactions = this.pendingTransactions.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateTransaction()
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateTransaction()
    }
  }

  get totalPages(): number {
    return Math.ceil(this.pendingTransactions.length / this.pageSize);
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.paginateTransaction()
  }
}