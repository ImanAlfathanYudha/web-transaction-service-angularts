import { Component } from '@angular/core';
import { Transaction } from 'src/app/model/transaction.model';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-table-transaction',
  templateUrl: './table-transaction.component.html',
  styleUrls: ['./table-transaction.component.scss']
})
export class TableTransactionComponent {
  transactions: any[] = [];
  pageSize = 5;
  currentPage = 1;
  constructor(private csvService: CsvUploadService) { }

  ngOnInit() {
    this.csvService.transactions$.subscribe(data => {
      console.log('tes data tabel ', data)
      this.transactions = data;
    });
  }

  get paginatedTransactions(): Transaction[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.transactions.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.transactions.length / this.pageSize);
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
  }
}

