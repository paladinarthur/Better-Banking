import mongoose from 'mongoose';

const ComparisonSchema = new mongoose.Schema({
    comparison: {
        loanAmount: String,
        loanType: String,
        employmentType: String,
        monthlyIncome: String,
        cibilScore: String
    },
    results: [{
        bankName: String,
        interestRate: String,
        emi: Number,
        eligibleAmount: Number,
        processingFee: String,
        tenure: Number
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        fullName: {
            type: String,
            default: ''
        },
        dateOfBirth: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        panCard: {
            type: String,
            default: ''
        },
        aadharNumber: {
            type: String,
            default: ''
        },
        occupation: {
            type: String,
            default: ''
        },
        annualIncome: {
            type: Number,
            default: 0
        }
    },
    bankingDetails: {
        accountNumber: String,
        bankName: String,
        ifscCode: String
    },
    loanHistory: [{
        date: String,
        type: String,
        amount: Number,
        status: String
    }],
    comparisons: [ComparisonSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', UserSchema); 