import React from 'react';
import './BankSelector.css';

interface Bank {
    id: string;
    name: string;
    rates: any;
}

interface Props {
    banks: Bank[];
    selectedBank: Bank;
    onBankSelect: (bank: Bank) => void;
}

const BankSelector: React.FC<Props> = ({ banks, selectedBank, onBankSelect }) => {
    return (
        <div className="bank-selector">
            <h2>Select Your Bank</h2>
            <div className="select-container">
                <select 
                    value={selectedBank.id}
                    onChange={(e) => {
                        const bank = banks.find(b => b.id === e.target.value);
                        if (bank?.rates) onBankSelect(bank);
                    }}
                    className="bank-dropdown"
                >
                    {banks.map(bank => (
                        <option 
                            key={bank.id} 
                            value={bank.id}
                            disabled={!bank.rates}
                        >
                            {bank.name} {!bank.rates ? '(Coming Soon)' : ''}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default BankSelector; 