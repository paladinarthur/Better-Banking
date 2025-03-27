import React, { useState } from 'react';
import BankSelector from '../components/BankSelector';
import GoldLoanCalculator from '../components/GoldLoanCalculator';
import './GoldLoan.css';

const ICICI_RATES = {
    rates: {
        6: {  // 6 months tenure
            24: 115460,
            22: 105840,
            21: 101020,
            20: 96220,
            19: 96220,
            18: 87780,
        },
        12: { // 12 months tenure
            24: 117040,
            22: 107280,
            21: 102400,
            20: 97520,
            19: 92660,
            18: 86600,
        }
    }
};

const BANKS = [
    { id: 'icici', name: 'ICICI Bank', rates: ICICI_RATES },
    { id: 'hdfc', name: 'HDFC Bank', rates: null },
    { id: 'sbi', name: 'State Bank of India', rates: null },
    { id: 'kotak', name: 'Kotak Bank', rates: null },
];

const GoldLoan: React.FC = () => {
    const [selectedBank, setSelectedBank] = useState(BANKS[0]);

    return (
        <div className="gold-loan-container">
            <h1>Gold Loan Calculator</h1>
            
            <BankSelector 
                banks={BANKS} 
                selectedBank={selectedBank} 
                onBankSelect={setSelectedBank}
            />

            {selectedBank.rates && (
                <GoldLoanCalculator bankRates={selectedBank.rates} />
            )}
        </div>
    );
};

export default GoldLoan; 