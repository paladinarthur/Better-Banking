export interface Loan {
  id: string;
  bankName: string;
  type: string;
  interestRate: number;
  processingFee: number;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  requirements: string[];
} 