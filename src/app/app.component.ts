import { Component } from '@angular/core';
import { CsvUploadService } from './services/csv-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'csv-viewer-app';
  transactions: any[] = [];

  constructor(private csvService: CsvUploadService) { }
  loading = false;
  error: string | null = null;

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
