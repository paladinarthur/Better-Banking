import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Car, Coins, Briefcase, GraduationCap, ChevronRight, LucideIcon } from 'lucide-react';
import './LearnMore.css';

interface LoanType {
    icon: LucideIcon;
    title: string;
    description: string;
    benefits: string[];
    link: string;
}

const LearnMore: React.FC = () => {
    const loanTypes: LoanType[] = [
        {
            icon: Home,
            title: 'Home Loans',
            description: 'Finance your dream home with competitive mortgage rates and flexible terms. Our home loans are designed to make homeownership accessible and affordable.',
            benefits: [
                'Competitive interest rates',
                'Flexible repayment terms up to 30 years',
                'Options for first-time homebuyers',
                'Both fixed and variable rates available'
            ],
            link: '/loans/home'
        },
        {
            icon: Car,
            title: 'Car Loans',
            description: 'Get on the road with our affordable car loan options. Whether new or used, we help you finance your vehicle with great rates.',
            benefits: [
                'Quick approval process',
                'Competitive rates for new and used cars',
                'Flexible loan terms',
                'No hidden fees'
            ],
            link: '/loans/car'
        },
        {
            icon: Coins,
            title: 'Gold Loans',
            description: 'Turn your gold into an opportunity with our gold loan services. Get quick loans against your gold jewelry with attractive interest rates.',
            benefits: [
                'High value for your gold',
                'Quick disbursement',
                'Minimal documentation',
                'Secure storage'
            ],
            link: '/loans/gold'
        },
        {
            icon: Briefcase,
            title: 'Business Loans',
            description: 'Fuel your business growth with our tailored business loan solutions. From working capital to expansion, weve got you covered.',
            benefits: [
                'Customized loan solutions',
                'Competitive interest rates',
                'Minimal documentation',
                'Quick processing'
            ],
            link: '/compare'
        },
        {
            icon: GraduationCap,
            title: 'Education Loans',
            description: 'Invest in your future with our education loans. We help make quality education accessible with student-friendly loan terms.',
            benefits: [
                'Covers tuition and living expenses',
                'Extended repayment period',
                'Grace period after graduation',
                'Competitive interest rates'
            ],
            link: '/compare'
        }
    ];

    return (
        <div className="learn-more-container">
            <section className="learn-more-hero">
                <div className="container">
                    <h1>Understanding Your Loan Options</h1>
                    <p>Make informed decisions about your financial future with our comprehensive guide to different types of loans.</p>
                </div>
            </section>

            <section className="loan-types-overview">
                <div className="container">
                    {loanTypes.map((loan, index) => (
                        <div key={index} className="loan-type-card">
                            <div className="loan-icon">
                                <loan.icon size={32} />
                            </div>
                            <div className="loan-content">
                                <h2>{loan.title}</h2>
                                <p>{loan.description}</p>
                                <div className="benefits-list">
                                    <h3>Key Benefits:</h3>
                                    <ul>
                                        {loan.benefits.map((benefit, idx) => (
                                            <li key={idx}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <Link to={loan.link} className="learn-more-link">
                                    Compare {loan.title}
                                    <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Find Your Perfect Loan?</h2>
                    <p>Compare rates and options to make the best choice for your needs</p>
                    <Link to="/compare" className="cta-button">
                        Start Comparing Now
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LearnMore; 