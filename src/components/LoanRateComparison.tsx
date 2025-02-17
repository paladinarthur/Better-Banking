import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanRateComparison.css';

interface LoanRate {
    cibil?: string;
    slab?: string;
    salaried: string;
    selfEmployed: string;
}

const LoanRateComparison = () => {
    const [loanRates, setLoanRates] = useState<LoanRate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoanRates = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loan-rates');
                setLoanRates(response.data);
            } catch (error) {
                console.error('Error fetching loan rates:', error);
                setError('Failed to load loan rates');
            } finally {
                setLoading(false);
            }
        };

        fetchLoanRates();
    }, []);

    if (loading) return <div className="loading">Loading rates...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="loan-rates-container">
            <h2>ICICI Bank Loan Interest Rates</h2>
            <div className="loan-rates-table">
                <div className="table-header">
                    <div>CIBIL Score / Loan Amount</div>
                    <div>Salaried</div>
                    <div>Self Employed</div>
                </div>
                {loanRates.map((rate, index) => (
                    <div key={index} className="table-row">
                        <div>{rate.cibil || rate.slab}</div>
                        <div>{rate.salaried}</div>
                        <div>{rate.selfEmployed}</div>
                    </div>
                ))}
            </div>
            <div className="rates-note">
                <p>Note: These rates are indicative and may vary based on various factors.</p>
                <ul>
                    <li>CIBIL Score based rates are applicable for all loan amounts</li>
                    <li>For CIBIL Score below 750, slab-based rates will apply</li>
                    <li>Additional charges and processing fees may apply</li>
                </ul>
            </div>
        </div>
    );
};

export default LoanRateComparison; 