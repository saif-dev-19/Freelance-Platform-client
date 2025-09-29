import React from 'react';
import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
        <div>
            <h1 className='font-bold text-green-800 text-xl'>Your payment Successful return to <Link to="/dashboard" >Dashboard</Link></h1>
            <span className='font-bold text-xl'>Thank you</span>
        </div>
    );
};

export default PaymentSuccess;