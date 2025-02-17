import React from 'react';
import './LoanRatesTable.css';
import { LoanRate, LoanSlab } from '../pages/HomeLoan';

interface Props {
    rates: (LoanRate | LoanSlab)[];
    employmentType: 'salaried' | 'selfEmployed';
    type: 'cibil' | 'slab';
}

const LoanRatesTable: React.FC<Props> = ({ rates, employmentType, type }) => {
    return (
        <div className="loan-rates-table">
            <div className="table-header">
                <div>{type === 'cibil' ? 'CIBIL Score' : 'Loan Amount'}</div>
                <div>Interest Rate</div>
            </div>
            {rates.map((rate, index) => (
                <div key={index} className="table-row">
                    <div>{type === 'cibil' ? (rate as LoanRate).cibil : (rate as LoanSlab).slab}</div>
                    <div>{rate[employmentType]}%</div>
                </div>
            ))}
        </div>
    );
};

export default LoanRatesTable; 