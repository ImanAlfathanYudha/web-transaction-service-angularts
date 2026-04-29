import { Component } from '@angular/core';
import { Transaction } from 'src/app/model/transaction.model';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-table-issue',
  templateUrl: './table-issue.component.html',
  styleUrls: ['./table-issue.component.scss']
})
export class TableIssueComponent {
  issuesTransactions: Transaction[] = [];
  paginatedIssuesTransactions: Transaction[] = [];
  pageSize = 5;
  currentPage = 1;

  constructor(private csvService: CsvUploadService) { }


  ngOnInit() {
    this.csvService.issues$.subscribe(data => {
      this.issuesTransactions = data
    });
    console.log('tes pendingTransactions comp ', this.issuesTransactions)
    this.paginateTransaction()
  }

  paginateTransaction() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedIssuesTransactions = this.issuesTransactions.slice(start, end);
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
    return Math.ceil(this.issuesTransactions.length / this.pageSize);
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.paginateTransaction()
  }
}
