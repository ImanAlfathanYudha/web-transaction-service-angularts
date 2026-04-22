import { Component } from '@angular/core';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'app-table-issue',
  templateUrl: './table-issue.component.html',
  styleUrls: ['./table-issue.component.scss']
})
export class TableIssueComponent {
  issues: any[] = [];

  constructor(private csvService: CsvUploadService) { }

  ngOnInit() {
    this.csvService.issues$.subscribe(data => {
      console.log('🔥 issue data:', data);
      this.issues = data;
    });
  }
}
