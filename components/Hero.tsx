'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772121599/NEWLY_uotstg.png",
        title: "Performance collection",
        subtitle: "Engineered for the elite",
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772122405/Uniform_Kit_jukisv.png",
        title: "Full uniform kit",
        subtitle: "Official HSGA standard gear",
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772122866/Uniform_Kit_1_dm9q3d.png",
        title: "Elite training apparel",
        subtitle: "Superior comfort and durability",
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [current]); // Reset timer when manually changed

    return (
        <section className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden bg-zinc-100">
            {/* Slides Container */}
            <div className="relative h-full w-full">
                {banners.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Static Hero Image (No Animation) */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />

                        {/* Left-Aligned Content */}
                        <div className="container mx-auto h-full relative z-20 px-6 md:px-12 flex items-center">
                            <div className="max-w-xl">
                                {index === current && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-left-6 duration-1000">
                                        <p className="text-zinc-600 text-sm md:text-base font-normal tracking-wide">
                                            {slide.subtitle}
                                        </p>
                                        <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight leading-[1.1]">
                                            {slide.title}
                                        </h2>
                                        <div className="pt-4">
                                            <button className="px-8 py-3 bg-zinc-900 text-white text-[13px] font-medium rounded-full hover:bg-black transition-all hover:shadow-xl active:scale-95">
                                                Shop the collection
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-30 flex items-center gap-6">
                {/* Progress Indicators */}
                <div className="flex gap-2.5">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="p-2.5 bg-white text-zinc-900 shadow-md rounded-full transition-all hover:bg-zinc-100 hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-2.5 bg-white text-zinc-900 shadow-md rounded-full transition-all hover:bg-zinc-100 hover:scale-110 active:scale-95"
                    >
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;