import React from 'react';

const WelcomeCard = ({ user, message, icon }) => (
  <div className="overflow-hidden rounded-2xl bg-[#0F172A] text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
    <div className="relative p-6 md:p-8">
      <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-[#38BDF8]/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.first_name+ ' ' +user?.last_name}!</h1>
          <p className="mt-2 max-w-xl text-slate-300">{message}</p>
        </div>
        <div className="hidden lg:block">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F97316] shadow-lg shadow-orange-950/25">
            <i className={`bi ${icon} text-2xl`}></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeCard;
