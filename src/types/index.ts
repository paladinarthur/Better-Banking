export interface Loan {
  id: string;
  bankName: string;
  type: 'personal' | 'business' | 'student' | 'mortgage';
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  processingFee: number;
  requirements: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  savedLoans: string[];
}