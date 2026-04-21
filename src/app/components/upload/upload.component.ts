import { Component } from '@angular/core';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'upload-component',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(private csvService: CsvUploadService) { }
  loading = false;

  ngOnInit() {
    this.csvService.loading$.subscribe(val => {
      this.loading = val;
    });
  }

  onFileSelected(event: Event) {
    console.log('tes onFileSelected onclick ', event)
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      alert('⚠️ File not found');
      return;
    }

    this.csvService.uploadTransactionCSV(file).subscribe({
      next: (res) => {
        alert('✅ File uploaded successfully!');
        console.log('tes onFileSelected response:', res);
      },
      error: (err) => {
        console.log('tes error onFileSelected response:', );
        alert('❌ Upload failed. ' + err);
        console.error(err);
      }
    });
  }


}
