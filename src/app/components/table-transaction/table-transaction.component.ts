import { Component } from '@angular/core';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-table-transaction',
  templateUrl: './table-transaction.component.html',
  styleUrls: ['./table-transaction.component.scss']
})
export class TableTransactionComponent {
  transactions: any[] = [];

  constructor(private csvService: CsvUploadService) { }

  ngOnInit() {
    this.csvService.transactions$.subscribe(data => {
      console.log('tes data tabel ', data)
      this.transactions = data;
    });
  }
}
