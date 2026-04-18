import { Component } from '@angular/core';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent {
summary: any;

constructor(private csvService: CsvUploadService) {}

ngOnInit() {
  this.csvService.summary$.subscribe(data => {
    console.log('tes 🔥 summary data:', data);
    this.summary = data;
  });
}
}
