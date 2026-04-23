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

  constructor(private csvService: CsvUploadService) {}

  ngOnInit() {
    this.csvService.pendingTransaction$.subscribe(data => {
      this.pendingTransactions = (data || []).filter(
        t => t.status === 'PENDING'
      );
    });
    console.log('tes pendingTransactions comp ',this.pendingTransactions)
  }
}