import { Component } from '@angular/core';
import { CsvUploadService } from 'src/app/services/csv-upload.service';

@Component({
  selector: 'upload-component',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(private csvService: CsvUploadService) { }

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

        if (res?.Notes) {
          alert('⚠️ ' + res.Notes);
        }
      },
      error: (err) => {
        alert('❌ Upload failed');
        console.error(err);
      }
    });
  }


}
