import React, { useState } from 'react';
import './LoanCalculator.css';

interface Props {
    bankRates: {
        cibilRates: any[];
        slabRates: any[];
    };
    employmentType: 'salaried' | 'selfEmployed';
}

const LoanCalculator: React.FC<Props> = ({ bankRates, employmentType }) => {
    const [loanAmount, setLoanAmount] = useState('');
    const [tenure, setTenure] = useState('20');
    const [cibilScore, setCibilScore] = useState('');
    const [error, setError] = useState('');
    const [emi, setEmi] = useState<number | null>(null);
    const [totalPayment, setTotalPayment] = useState<number | null>(null);
    const [interestRate, setInterestRate] = useState<number | null>(null);

    const calculateLoan = () => {
        // Reset previous results and errors
        setError('');
        setEmi(null);
        setTotalPayment(null);
        setInterestRate(null);

        // Validate inputs
        if (!loanAmount) {
            setError('Please enter loan amount');
            return;
        }
        if (!cibilScore) {
            setError('Please enter CIBIL score');
            return;
        }

        const score = Number(cibilScore);
        const amount = Number(loanAmount);

        if (score < 300) {
            setError('CIBIL score cannot be less than 300');
            return;
        }
        if (score > 900) {
            setError('CIBIL score cannot exceed 900');
            return;
        }

        // Calculate interest rate based on CIBIL score and loan amount
        let rate: number;
        if (score > 800) {
            rate = Number(bankRates.cibilRates[0][employmentType]);
        } else if (score >= 750) {
            rate = Number(bankRates.cibilRates[1][employmentType]);
        } else {
            // Use slab based rates
            if (amount <= 3500000) {
                rate = Number(bankRates.slabRates[0][employmentType].split(' - ')[0]);
            } else if (amount <= 7500000) {
                rate = Number(bankRates.slabRates[1][employmentType].split(' - ')[0]);
            } else {
                rate = Number(bankRates.slabRates[2][employmentType].split(' - ')[0]);
            }
        }
        
        setInterestRate(rate);
        
        // Calculate EMI
        const monthlyRate = rate / (12 * 100);
        const months = Number(tenure) * 12;
        const emiAmount = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
        
        setEmi(emiAmount);
        setTotalPayment(emiAmount * months);
    };

    return (
        <div className="loan-calculator">
            <h2>EMI Calculator</h2>
            <div className="calculator-form">
                <div className="form-group">
                    <label>Loan Amount (₹)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="Enter loan amount"
                    />
                </div>
                
                <div className="form-group">
                    <label>CIBIL Score</label>
                    <input
                        type="number"
                        value={cibilScore}
                        onChange={(e) => setCibilScore(e.target.value)}
                        placeholder="Enter CIBIL score (300-900)"
                    />
                </div>

                <div className="form-group">
                    <label>Tenure (Years)</label>
                    <select value={tenure} onChange={(e) => setTenure(e.target.value)}>
                        {[5,10,15,20].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button onClick={calculateLoan} className="calculate-button">
                    Calculate EMI
                </button>

                {interestRate && (
                    <div className="interest-rate">
                        Applicable Interest Rate: {interestRate}%
                    </div>
                )}

                {emi && totalPayment && (
                    <div className="calculation-results">
                        <div className="result-item">
                            <label>Monthly EMI</label>
                            <div className="amount">₹ {emi.toFixed(2)}</div>
                        </div>
                        <div className="result-item">
                            <label>Total Payment</label>
                            <div className="amount">₹ {totalPayment.toFixed(2)}</div>
                        </div>
                        <div className="result-item">
                            <label>Total Interest</label>
                            <div className="amount">₹ {(totalPayment - Number(loanAmount)).toFixed(2)}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoanCalculator; 