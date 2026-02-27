import React from 'react';
import Hero from '@/components/Hero';
import ScrollingText from '@/components/ScrollingText';
import StoreSection from '@/components/StoreSection';
import IdCardSection from '@/components/IdCardSection';
import FeaturesSection from '@/components/FeaturesSection';

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

        {/* Additional ID Card Features */}
        <FeaturesSection />

      </main>
    </div>
  );
}
