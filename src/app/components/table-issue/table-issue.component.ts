import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/model/transaction.model';

@Component({
  selector: 'app-table-issue',
  templateUrl: './table-issue.component.html',
  styleUrls: ['./table-issue.component.scss']
})
export class TableIssueComponent {
  @Input() issuesTransactions: Transaction[] = [];
  paginatedIssuesTransactions: Transaction[] = [];
  pageSize = 5;
  currentPage = 1;

  ngOnInit() {
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
