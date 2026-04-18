export interface Transaction {
  timestamp: number; 
  name: string;      
  type: "DEBIT" | "CREDIT";
  amount: number;          
  status: "SUCCESS" | "FAILED" | "PENDING";
  description: string;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalBalance: number;
  totalFailed: number;
  totalPending: number;
}