import React from 'react';
import { Link } from 'react-router';

const QuickAction = ({ to,title, description, icon, color }) => (
  <div className="cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#38BDF8]/50 hover:shadow-lg">
    <Link to={to}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
            <i className={`${icon} text-lg text-white`}></i>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#0F172A]">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
          <i className="bi bi-arrow-right text-neutral/40"></i>
        </div>
      </div>
    </Link>
  </div>
);

export default QuickAction;
