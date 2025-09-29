import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="card bg-white shadow-sm border border-base-300">
    <div className="card-body p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral/70 font-medium">{title}</p>
          <p className="text-2xl font-bold text-neutral mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
