import { Loan } from '../types';

export const mockLoans: Loan[] = [
  {
    id: '1',
    bankName: 'First National Bank',
    type: 'personal',
    interestRate: 8.5,
    processingFee: 1.5,
    minAmount: 5000,
    maxAmount: 50000,
    minTerm: 12,
    maxTerm: 60,
    requirements: [
      'Minimum credit score of 650',
      'Proof of income',
      'Valid ID'
    ]
  },
  {
    id: '2',
    bankName: 'City Trust',
    type: 'business',
    interestRate: 4.99,
    minAmount: 25000,
    maxAmount: 500000,
    minTerm: 24,
    maxTerm: 84,
    processingFee: 2.0,
    requirements: ['2+ years in business', 'Annual revenue > $100,000', 'Business plan']
  },
  {
    id: '3',
    bankName: 'Student First',
    type: 'student',
    interestRate: 3.99,
    minAmount: 1000,
    maxAmount: 25000,
    minTerm: 36,
    maxTerm: 120,
    processingFee: 0.5,
    requirements: ['Enrolled in accredited university', 'Maintaining good academic standing']
  }
];