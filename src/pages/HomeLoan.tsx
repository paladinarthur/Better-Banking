import React, { useState } from 'react';
import BankSelector from '../components/BankSelector';
import LoanRatesTable from '../components/LoanRatesTable';
import LoanCalculator from '../components/LoanCalculator';
import './HomeLoan.css';

export interface LoanRate {
    cibil?: string;
    salaried: string;
    selfEmployed: string;
}

export interface LoanSlab {
    slab: string;
    salaried: string;
    selfEmployed: string;
}

const ICICI_RATES = {
    cibilRates: [
        { cibil: ">800", salaried: "9.00", selfEmployed: "9.00" },
        { cibil: "750-800", salaried: "9.00", selfEmployed: "9.10" },
    ],
    slabRates: [
        { slab: "Up to ₹ 35 lakhs", salaried: "9.25 - 9.65", selfEmployed: "9.40 - 9.80" },
        { slab: "₹ 35 lakhs to ₹ 75 lakhs", salaried: "9.50 - 9.80", selfEmployed: "9.65 - 9.95" },
        { slab: "Above ₹ 75 lakhs", salaried: "9.60 - 9.90", selfEmployed: "9.75 - 10.05" },
    ]
};

const BANKS = [
    { id: 'icici', name: 'ICICI Bank', rates: ICICI_RATES },
    { id: 'hdfc', name: 'HDFC Bank', rates: null }, // To be added later
    { id: 'sbi', name: 'State Bank of India', rates: null }, // To be added later
    { id: 'kotak', name: 'Kotak Bank', rates: null }, // To be added later
];

const HomeLoan: React.FC = () => {
    const [selectedBank, setSelectedBank] = useState(BANKS[0]);
    const [employmentType, setEmploymentType] = useState<'salaried' | 'selfEmployed'>('salaried');

    return (
        <div className="home-loan-container">
            <h1>Home Loan Interest Rates</h1>
            
            <BankSelector 
                banks={BANKS} 
                selectedBank={selectedBank} 
                onBankSelect={setSelectedBank}
            />

            {selectedBank.rates && (
                <>
                    <div className="employment-selector">
                        <label>
                            <input
                                type="radio"
                                value="salaried"
                                checked={employmentType === 'salaried'}
                                onChange={(e) => setEmploymentType(e.target.value as 'salaried')}
                            /> Salaried
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="selfEmployed"
                                checked={employmentType === 'selfEmployed'}
                                onChange={(e) => setEmploymentType(e.target.value as 'selfEmployed')}
                            /> Self Employed
                        </label>
                    </div>

                    <div className="rates-section">
                        <div className="rates-column">
                            <h2>CIBIL Score Based Rates</h2>
                            <LoanRatesTable 
                                rates={selectedBank.rates.cibilRates} 
                                employmentType={employmentType}
                                type="cibil"
                            />
                        </div>
                        
                        <div className="rates-column">
                            <h2>Loan Amount Based Rates</h2>
                            <LoanRatesTable 
                                rates={selectedBank.rates.slabRates} 
                                employmentType={employmentType}
                                type="slab"
                            />
                        </div>
                    </div>

                    <LoanCalculator 
                        bankRates={selectedBank.rates}
                        employmentType={employmentType}
                    />

                    <div className="loan-notes">
                        <h3>Important Notes:</h3>
                        <ul>
                            <li>CIBIL Score based rates are applicable for all loan amounts</li>
                            <li>For CIBIL Score below 750, slab-based rates will apply</li>
                            <li>Processing fee: 0.5% of loan amount</li>
                            <li>Maximum tenure: 20 years</li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default HomeLoan; 