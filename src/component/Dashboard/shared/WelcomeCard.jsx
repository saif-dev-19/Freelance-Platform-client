import React from 'react';

const WelcomeCard = ({ user, message, icon }) => (
  <div className="card bg-gradient-to-r from-primary to-primary-600 text-white">
    <div className="card-body p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.first_name+ ' ' +user?.last_name}!</h1>
          <p className="text-primary-100 mt-1">{message}</p>
        </div>
        <div className="hidden lg:block">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <i className={`bi ${icon} text-2xl`}></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeCard;
