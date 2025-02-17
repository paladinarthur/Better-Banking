import React, { useState } from 'react';
import './CarLoanCalculator.css';

interface Props {
    bankRates: {
        baseRate: number;
    };
}

const CarLoanCalculator: React.FC<Props> = ({ bankRates }) => {
    const [loanAmount, setLoanAmount] = useState('');
    const [tenure, setTenure] = useState('60'); // 60 months = 5 years
    const [error, setError] = useState('');
    const [emi, setEmi] = useState<number | null>(null);
    const [totalPayment, setTotalPayment] = useState<number | null>(null);

    const calculateLoan = () => {
        setError('');
        setEmi(null);
        setTotalPayment(null);

        if (!loanAmount) {
            setError('Please enter loan amount');
            return;
        }

        const amount = Number(loanAmount);
        const rate = bankRates.baseRate;
        const months = Number(tenure);
        
        // Calculate EMI
        const monthlyRate = rate / (12 * 100);
        const emiAmount = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
        
        setEmi(emiAmount);
        setTotalPayment(emiAmount * months);
    };

    const presetAmounts = [
        { label: '10L', value: '1000000' },
        { label: '20L', value: '2000000' },
        { label: '50L', value: '5000000' },
        { label: '1Cr', value: '10000000' },
        { label: '5Cr', value: '50000000' },
    ];

    return (
        <div className="loan-calculator">
            <h2>Car Loan EMI Calculator</h2>
            <div className="calculator-form">
                <div className="form-group">
                    <label>Loan Amount (₹)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="Enter loan amount"
                    />
                    <div className="preset-amounts">
                        {presetAmounts.map(amount => (
                            <button
                                key={amount.value}
                                onClick={() => setLoanAmount(amount.value)}
                                className={loanAmount === amount.value ? 'active' : ''}
                            >
                                {amount.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Loan Tenure</label>
                    <div className="tenure-selector">
                        <select 
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                        >
                            {[12, 24, 36, 48, 60, 72, 84].map(months => (
                                <option key={months} value={months}>
                                    {months} Months ({(months/12).toFixed(1)} Years)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button onClick={calculateLoan} className="calculate-button">
                    Calculate EMI
                </button>

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

export default CarLoanCalculator; 