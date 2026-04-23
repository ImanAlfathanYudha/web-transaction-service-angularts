import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { TableTransactionComponent } from './components/table-transaction/table-transaction.component';
import { TransactionSummaryComponent } from './components/transaction-summary/transaction-summary.component';
import { TableIssueComponent } from './components/table-issue/table-issue.component';
import { PendingTransactionComponent } from './components/pending-transaction/pending-transaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    TableTransactionComponent,
    TransactionSummaryComponent,
    TableIssueComponent,
    PendingTransactionComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
