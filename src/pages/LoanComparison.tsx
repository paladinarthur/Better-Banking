import { useState } from 'react';
import LoanRateComparison from '../components/LoanRateComparison';
import './LoanComparisonPage.css';

interface LoanCalculation {
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    interestRate: string;
}

const LoanComparison = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [employmentType, setEmploymentType] = useState('salaried');
    const [cibilScore, setCibilScore] = useState('');
    const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

    const calculateLoanDetails = (amount: number, rate: number) => {
        const monthlyRate = rate / 1200; // Convert annual rate to monthly decimal
        const termInMonths = 240; // 20 years fixed term

        const monthlyPayment = 
            (amount * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) / 
            (Math.pow(1 + monthlyRate, termInMonths) - 1);

        const totalPayment = monthlyPayment * termInMonths;
        const totalInterest = totalPayment - amount;

        return {
            monthlyPayment,
            totalInterest,
            totalPayment
        };
    };

    const getInterestRate = (amount: number, cibil: number, isEmployed: boolean) => {
        if (cibil > 800) return isEmployed ? 9.00 : 9.00;
        if (cibil >= 750) return isEmployed ? 9.00 : 9.10;
        
        if (amount <= 3500000) return isEmployed ? 9.45 : 9.60;
        if (amount <= 7500000) return isEmployed ? 9.65 : 9.80;
        return isEmployed ? 9.75 : 9.90;
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        
        const amount = Number(loanAmount);
        const cibil = Number(cibilScore);
        const isEmployed = employmentType === 'salaried';

        if (!amount || !cibil) {
            alert('Please fill in all fields');
            return;
        }

        const interestRate = getInterestRate(amount, cibil, isEmployed);
        const details = calculateLoanDetails(amount, interestRate);

        setCalculation({
            ...details,
            interestRate: `${interestRate}%`
        });
    };

    return (
        <div className="loan-comparison-page">
            <div className="page-header">
                <h1>Compare Loan Rates</h1>
                <p>Find the best loan rates based on your profile</p>
            </div>
            
            <div className="comparison-sections">
                <LoanRateComparison />

                <div className="calculator-section">
                    <h2>Loan Calculator</h2>
                    <form onSubmit={handleCalculate} className="calculator-form">
                        <div className="form-group">
                            <label htmlFor="loanAmount">Loan Amount (₹)</label>
                            <input
                                type="number"
                                id="loanAmount"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                placeholder="Enter loan amount"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="employmentType">Employment Type</label>
                            <select
                                id="employmentType"
                                value={employmentType}
                                onChange={(e) => setEmploymentType(e.target.value)}
                                required
                            >
                                <option value="salaried">Salaried</option>
                                <option value="selfEmployed">Self Employed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cibilScore">CIBIL Score</label>
                            <input
                                type="number"
                                id="cibilScore"
                                value={cibilScore}
                                onChange={(e) => setCibilScore(e.target.value)}
                                placeholder="Enter your CIBIL score"
                                min="300"
                                max="900"
                                required
                            />
                        </div>

                        <button type="submit" className="calculate-btn">
                            Calculate EMI
                        </button>
                    </form>

                    {calculation && (
                        <div className="results-section">
                            <h3>Loan Details</h3>
                            <div className="results-grid">
                                <div className="result-item">
                                    <label>Interest Rate</label>
                                    <p>{calculation.interestRate}</p>
                                </div>
                                <div className="result-item">
                                    <label>Monthly EMI</label>
                                    <p>₹ {calculation.monthlyPayment.toFixed(2)}</p>
                                </div>
                                <div className="result-item">
                                    <label>Total Interest</label>
                                    <p>₹ {calculation.totalInterest.toFixed(2)}</p>
                                </div>
                                <div className="result-item">
                                    <label>Total Payment</label>
                                    <p>₹ {calculation.totalPayment.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoanComparison; 