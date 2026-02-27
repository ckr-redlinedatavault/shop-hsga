import React from 'react';
import Hero from '@/components/Hero';
import ScrollingText from '@/components/ScrollingText';
import StoreSection from '@/components/StoreSection';
import IdCardSection from '@/components/IdCardSection';
import { ShoppingBag, Star, Zap } from 'lucide-react';

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Dynamic Hero Banners */}
        <Hero />

        {/* Scrolling Store Content */}
        <ScrollingText />

        <div className="py-2 bg-white" />

        {/* Dynamic Store Section (Admin Managed) */}
        <StoreSection />

        {/* Dedicated ID Card Banner Section */}
        <IdCardSection />

        {/* Featured / Trust Section */}
        <section className="bg-zinc-50 py-16 md:py-32 border-y border-zinc-100">
          <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-[1rem] md:rounded-2xl flex items-center justify-center shadow-xl">
                <Zap className="text-zinc-900" size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900">Fast Delivery</h4>
              <p className="text-zinc-500 text-[13px] md:text-sm leading-relaxed max-w-xs">Getting your gear to you at lightning speed with HSGA premium courier partners.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-[1rem] md:rounded-2xl flex items-center justify-center shadow-xl">
                <Star className="text-zinc-900" size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900">Premium Quality</h4>
              <p className="text-zinc-500 text-[13px] md:text-sm leading-relaxed max-w-xs">Every HSGA piece is engineered from the highest quality fabrics and components.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-[1rem] md:rounded-2xl flex items-center justify-center shadow-xl">
                <ShoppingBag className="text-zinc-900" size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900">Easy Returns</h4>
              <p className="text-zinc-500 text-[13px] md:text-sm leading-relaxed max-w-xs">Shop with confidence with our 30-day no-questions-asked return policy.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
