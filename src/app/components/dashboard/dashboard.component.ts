import { Component } from '@angular/core';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'csv-viewer-app';
  transactions: any[] = [];

  constructor(private csvService: CsvUploadService) { }
  loading = false;
  error: string | null = null;
  activeTab: 'transactions' | 'issues' = 'transactions';
  ngOnInit() {
    this.csvService.transactions$.subscribe(data => {
      console.log('tes table data on app ', data)
      this.transactions = data || [];
    });
    this.csvService.loading$.subscribe(val => {
      this.loading = val;
    });
    this.csvService.error$.subscribe(err => {
      this.error = err;
    });
  }
}
