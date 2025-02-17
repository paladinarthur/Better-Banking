import React, { useState } from 'react';
import BankSelector from '../components/BankSelector';
import CarLoanCalculator from '../components/CarLoanCalculator';
import './CarLoan.css';

const ICICI_RATES = {
    baseRate: 9.10
};

const BANKS = [
    { id: 'icici', name: 'ICICI Bank', rates: ICICI_RATES },
    { id: 'hdfc', name: 'HDFC Bank', rates: null },
    { id: 'sbi', name: 'State Bank of India', rates: null },
    { id: 'kotak', name: 'Kotak Bank', rates: null },
];

const CarLoan: React.FC = () => {
    const [selectedBank, setSelectedBank] = useState(BANKS[0]);

    return (
        <div className="car-loan-container">
            <h1>Car Loan Interest Rates</h1>
            
            <BankSelector 
                banks={BANKS} 
                selectedBank={selectedBank} 
                onBankSelect={setSelectedBank}
            />

            {selectedBank.rates && (
                <CarLoanCalculator bankRates={selectedBank.rates} />
            )}
        </div>
    );
};

export default CarLoan; 