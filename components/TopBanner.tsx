'use client';

import React from 'react';

const TopBanner = () => {
  return (
    <div className="w-full bg-[#ff5e00] py-2 md:py-3 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-12 text-[11px] md:text-[13px] text-white/90">

          {/* Brand Identity */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white hidden sm:block" />
            <span className="font-semibold text-white text-center">Hindustan Scouts and Guides Association</span>
            <span className="text-white/70 font-light hidden sm:inline">Telangana State</span>
          </div>

          {/* Minimal Vertical Divider */}
          <div className="hidden md:block w-px h-3.5 bg-white/20" />

          {/* Shipping Message */}
          <div className="flex items-center gap-1 font-normal opacity-90 md:opacity-100">
            <span>Free shipping on orders over</span>
            <span className="font-semibold text-white">₹5,000</span>
          </div>

          {/* Minimal Vertical Divider */}
          <div className="hidden md:block w-px h-3.5 bg-white/20" />

          {/* Call to Action */}
          <button className="group flex items-center gap-1.5 font-bold md:font-medium text-white transition-colors hover:text-white/70 mt-1 md:mt-0">
            <span>Shop the new collection</span>
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
};

export default TopBanner;