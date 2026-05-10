import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/model/transaction.model';
import { CsvUploadService } from 'src/app/services/csv-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-transaction',
  templateUrl: './table-transaction.component.html',
  styleUrls: ['./table-transaction.component.scss']
})
export class TableTransactionComponent {
  @Input() transactions: Transaction[] = [];
  @Input() paginatedTransactions!: Observable<Transaction[]>;

  currentPage = 1;
  // paginatedTransactions$ = this.csvService.paginatedTransactions$;
  totalPages$ = this.csvService.totalPages$;
  constructor(
    private csvService: CsvUploadService,
    private router: Router,
  ) { }
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
  goToDetail(timestamp: number): void {
    this.router.navigate(['/edit/' + timestamp]);
  }

}

