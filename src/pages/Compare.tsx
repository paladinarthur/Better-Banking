import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Lock, Shield } from 'lucide-react';
import './Compare.css';

interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
}

interface FormData {
    loanPurpose: string;
    loanAmount: string;
    employmentType: string;
    monthlyIncome: string;
    creditScore: string;
    urgency: string;
    homeOwnership: string;
    estimatedCreditScore: string;
    directDeposit: string;
    annualIncome: string;
    personalInfo: PersonalInfo;
}

const Compare: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        loanPurpose: '',
        loanAmount: '',
        employmentType: '',
        monthlyIncome: '',
        creditScore: '',
        urgency: '',
        homeOwnership: '',
        estimatedCreditScore: '',
        directDeposit: '',
        annualIncome: '',
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
        },
    });

    const totalSteps = 6;
    const progress = (currentStep / totalSteps) * 100;

    const loanPurposes = [
        'Home Renovation',
        'Debt Consolidation',
        'Medical Expenses',
        'Education',
        'Wedding',
        'Business',
        'Vehicle Purchase',
        'Travel',
        'Other'
    ];

    const urgencyOptions = [
        'Immediately',
        'Within a week',
        'Within a month'
    ];

    const homeOwnershipOptions = [
        'Rent',
        'Own'
    ];

    const estimatedCreditScoreOptions = [
        'Good',
        'Average',
        'Bad'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev],
                    [child]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        switch (formData.loanPurpose) {
            case 'Home Renovation':
                navigate('/loans/home');
                break;
            case 'Vehicle Purchase':
                navigate('/loans/car');
                break;
            case 'Purchasing Gold':
                navigate('/loans/gold');
                break;
            default:
                console.log('Form submitted:', formData);
        }
    };

    const canContinue = (): boolean => {
        switch (currentStep) {
            case 1:
                return Boolean(formData.loanPurpose);
            case 2:
                return Boolean(formData.loanAmount);
            case 3:
                return Boolean(formData.employmentType && formData.monthlyIncome);
            case 4:
                return Boolean(formData.urgency);
            case 5:
                return Boolean(formData.homeOwnership && formData.estimatedCreditScore && 
                       formData.directDeposit && formData.annualIncome);
            case 6:
                return Boolean(formData.personalInfo.fullName && 
                       formData.personalInfo.email && 
                       formData.personalInfo.phone);
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="form-step">
                        <h2>Primary Reason for Selecting</h2>
                        <div className="form-group">
                            <select
                                name="loanPurpose"
                                value={formData.loanPurpose}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select primary reason</option>
                                <option value="Home Renovation">Home Renovation</option>
                                <option value="Vehicle Purchase">Vehicle Purchase</option>
                                <option value="Purchasing Gold">Purchasing Gold</option>
                                <option value="Debt Consolidation">Debt Consolidation</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="Medical Expenses">Medical Expenses</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <h2>Loan Amount</h2>
                        <div className="form-group">
                            <label>How much would you like to borrow?</label>
                            <input
                                type="number"
                                name="loanAmount"
                                value={formData.loanAmount}
                                onChange={handleInputChange}
                                placeholder="Enter amount"
                                min="10000"
                                max="1000000"
                                required
                            />
                            <span className="input-hint">₹10,000 - ₹10,00,000</span>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <h2>Employment Details</h2>
                        <div className="form-group">
                            <label>Employment Type</label>
                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select employment type</option>
                                <option value="salaried">Salaried</option>
                                <option value="self-employed">Self Employed</option>
                                <option value="business">Business Owner</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Monthly Income</label>
                            <input
                                type="number"
                                name="monthlyIncome"
                                value={formData.monthlyIncome}
                                onChange={handleInputChange}
                                placeholder="Enter monthly income"
                                required
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="form-step">
                        <h2>Loan Urgency</h2>
                        <div className="form-group">
                            <label>How soon do you need the loan?</label>
                            <select
                                name="urgency"
                                value={formData.urgency}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select urgency</option>
                                {urgencyOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="form-step">
                        <h2>Additional Details</h2>
                        <div className="form-group">
                            <label>Home Ownership Status</label>
                            <select
                                name="homeOwnership"
                                value={formData.homeOwnership}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select status</option>
                                {homeOwnershipOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Your Estimated Credit Score</label>
                            <select
                                name="estimatedCreditScore"
                                value={formData.estimatedCreditScore}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select credit score</option>
                                {estimatedCreditScoreOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Do you get paid via direct deposit?</label>
                            <select
                                name="directDeposit"
                                value={formData.directDeposit}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Annual Income Before Taxes</label>
                            <input
                                type="number"
                                name="annualIncome"
                                value={formData.annualIncome}
                                onChange={handleInputChange}
                                placeholder="Enter annual income"
                                required
                            />
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="form-step">
                        <h2>Personal Information</h2>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="personalInfo.fullName"
                                value={formData.personalInfo.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="personalInfo.email"
                                value={formData.personalInfo.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="personalInfo.phone"
                                value={formData.personalInfo.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="compare-page">
            <div className="loan-application-container">
                <div className="form-header">
                    <h1>Personal Loan Application</h1>
                    <p>Complete your application in just a few steps</p>
                </div>

                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }} 
                    />
                    <div className="steps-indicator">
                        {Array.from({ length: totalSteps }, (_, i) => (
                            <div
                                key={i}
                                className={`step-dot ${i + 1 <= currentStep ? 'active' : ''}`}
                                data-step={i + 1}
                            />
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="loan-form">
                    {renderStep()}

                    <div className="form-actions">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(prev => prev - 1)}
                                className="back-button"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                        )}
                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                disabled={!canContinue()}
                                className="next-button"
                            >
                                Next <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={!canContinue()}
                            >
                                Submit Application
                            </button>
                        )}
                    </div>

                    <div className="security-info">
                        <div className="security-item">
                            <Lock size={16} />
                            <span>Your information is securely encrypted</span>
                        </div>
                        <div className="security-item">
                            <Shield size={16} />
                            <span>No impact to your credit score</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Compare;
