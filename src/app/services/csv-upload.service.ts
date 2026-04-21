import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, forkJoin, Observable, switchMap, tap, throwError } from 'rxjs';
import { Transaction, TransactionSummary } from '../model/transaction.model';

const API_URL_UPLOAD_TRANSACTION = 'http://localhost:8800/api/v1/transaction/upload';
const API_URL_GET_TRANSACTION = 'http://localhost:8800/api/v1/transaction/balance'
const API_URL_GET_ISSUE = 'http://localhost:8800/api/v1/transaction/issues'
@Injectable({
  providedIn: 'root'
})
export class CsvUploadService {

  constructor(private http: HttpClient) { }

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);//Subject + punya current value. tempat nyimpen state + alat broadcast ke semua listener. Akan jadi pusat data stream
  //objek transaction di sini adalah total transaction yang berhasil aja
  transactions$ = this.transactionsSubject.asObservable();//transactions$ akan jadi data stream. versi read-only dari data (biar component cuma bisa baca)

  private summarySubject = new BehaviorSubject<TransactionSummary>({
    totalBalance: 0,
    totalTransactions: 0,
    totalFailed: 0,
    totalPending: 0
  });
  summary$ = this.summarySubject.asObservable();

  private issuesSubject = new BehaviorSubject<Transaction[]>([]);
  issues$ = this.issuesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  //Karena HttpClient di Angular memang mengembalikan Observable. Karena fungsi yang return async result, Observable dipakai untuk handle async flow (HTTP request)
  uploadTransactionCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // 🔥 START loading
    this.loadingSubject.next(true);

    return this.http.post(API_URL_UPLOAD_TRANSACTION, formData).pipe(//dikasih pipe agar hasil dari hit endpoint bisa dimodifikasi (Minimal disimpen aja).
      switchMap(() =>
        forkJoin({
          transactions: this.http.get(API_URL_GET_TRANSACTION),
          issues: this.http.get(API_URL_GET_ISSUE)
        })
      ),

      tap((res: any) => {
        const transactionData = res.transactions?.Data?.transactions || {};
        const balanceData = res.transactions?.Data?.total_balance || {};
        const issueData = res.issues?.Data?.issues || [];

        this.transactionsSubject.next(transactionData); //cara update data + ngasih tau semua subscriber kalau datanya berubah. mirip update state (mirip setState)
        this.issuesSubject.next(issueData)

        const summary: TransactionSummary = {
          totalTransactions: transactionData?.length || 0,
          totalBalance: balanceData || 0,
          totalFailed: issueData?.filter((i: any) => i.status === 'FAILED').length,
          totalPending: issueData?.filter((i: any) => i.status === 'PENDING').length
        };

        this.summarySubject.next(summary); //cara update data + ngasih tau semua subscriber kalau datanya berubah. mirip update state (mirip setState)
      }),

      catchError((err) => {
        console.error('❌ ERROR:', err);
        this.errorSubject.next('Upload failed. Please try again.');
        return throwError(() => err?.error?.Message);
      }),
      // 🔥 STOP loading (success)
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
  }
}

