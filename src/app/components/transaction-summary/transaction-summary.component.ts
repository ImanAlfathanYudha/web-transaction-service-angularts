import { Component, Input } from '@angular/core';
import { TransactionSummary } from 'src/app/model/transaction.model';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent {
  @Input() summary!: TransactionSummary;
  constructor(private csvService: CsvUploadService) { }

  ngOnInit() {
    this.csvService.summary$.subscribe(data => {
      console.log('tes 🔥 summary data:', data);
      this.summary = data;
    });
  }
}
