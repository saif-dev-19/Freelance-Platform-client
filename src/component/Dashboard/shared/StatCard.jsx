import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-lg">
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-black text-[#0F172A]">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${color}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
