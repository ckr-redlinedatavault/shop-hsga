import React from 'react';
import Link from 'next/link';

const IdCardSection = () => {
    return (
        <section className="w-full bg-white relative">
            <Link href="/id-cards" className="block w-full group relative">
                <img
                    src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772180319/hero_1_bautv0.png"
                    alt="Apply for HSGA Official ID Card"
                    className="w-full h-auto min-h-[200px] object-cover block"
                />

                {/* Bottom-Centered Button Overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12">
                    <div className="flex items-center gap-3 pl-6 pr-2 py-2 md:pl-8 md:pr-2.5 md:py-2.5 bg-white text-zinc-900 rounded-full font-bold text-xs md:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Apply for ID Card
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                            <svg
                                className="w-3.5 h-3.5 md:w-4 md:h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    );
};

export default IdCardSection;
