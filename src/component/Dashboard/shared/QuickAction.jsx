import React from 'react';

const QuickAction = ({ title, description, icon, color, onClick }) => (
  <div className="card bg-white shadow-sm border border-base-300 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
    <div className="card-body p-6">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <i className={`${icon} text-lg text-white`}></i>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-neutral">{title}</h3>
          <p className="text-sm text-neutral/70 mt-1">{description}</p>
        </div>
        <i className="bi bi-arrow-right text-neutral/40"></i>
      </div>
    </div>
  </div>
);

export default QuickAction;
