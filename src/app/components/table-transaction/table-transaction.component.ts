import { Component } from '@angular/core';
import { Transaction } from 'src/app/model/transaction.model';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-table-transaction',
  templateUrl: './table-transaction.component.html',
  styleUrls: ['./table-transaction.component.scss']
})
export class TableTransactionComponent {
  paginatedTransactions$ = this.csvService.paginatedTransactions$;
  totalPages$ = this.csvService.totalPages$;

  currentPage = 1;
  constructor(private csvService: CsvUploadService) { }
  nextPage() {
    this.currentPage++;
    this.csvService.setPage(this.currentPage);
  }

  prevPage() {
    this.currentPage--;
    this.csvService.setPage(this.currentPage);
  }

  onPageSizeChange(size: number) {
    this.currentPage = 1;
    this.csvService.setPageSize(+size);
  }

}

