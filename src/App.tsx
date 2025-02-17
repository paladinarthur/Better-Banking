import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Compare from './pages/Compare';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import HomeLoan from './pages/HomeLoan';
import CarLoan from './pages/CarLoan';
import GoldLoan from './pages/GoldLoan';
import LearnMore from './pages/LearnMore';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/loans/home" element={<HomeLoan />} />
                    <Route path="/loans/car" element={<CarLoan />} />
                    <Route path="/loans/gold" element={<GoldLoan />} />
                    <Route path="/auth" element={
                        <div dangerouslySetInnerHTML={{ 
                            __html: `<iframe src="/auth.html" style="width:100%;height:100vh;border:none;" />` 
                        }} />
                    } />
                    <Route path="/about" element={<LearnMore />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;