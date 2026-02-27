'use client';

import React from 'react';

const ScrollingText = () => {
    const items = [
        "Uniforms",
        "Badges",
        "Id cards",
        "Shields",
        "Official standard gear",
        "Hsga merch",
        "Fast delivery",
        "Premium quality"
    ];

    return (
        /* 
           Vibrant Emerald Green (bg-[#22c55e]). 
           Using Black text (zinc-900) for a high-contrast, premium look.
        */
        <div className="w-full bg-[#22c55e] py-5 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {/* Duplicate items for a seamless loop */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16 px-8">
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Bold Font - Normal Casing - No Italics */}
                                <span className="text-zinc-900 font-bold text-sm md:text-base tracking-tight">
                                    {item}
                                </span>
                                {/* Minimal dot separator */}
                                <span className="w-1.5 h-1.5 bg-zinc-900/30 rounded-full" />
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 35s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default ScrollingText;