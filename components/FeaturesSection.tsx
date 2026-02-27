import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesSection() {
    const features = [
        {
            title: "Official ID Cards",
            description: "State-recognized identification for scouts and guides.",
        },
        {
            title: "Durable Material",
            description: "High-quality PVC construction designed for daily field use.",
        },
        {
            title: "Quick Processing",
            description: "Fast-tracked verification and dispatch within 48 hours.",
        },
        {
            title: "Secure Verification",
            description: "Embedded security features for authentic institutional validation.",
        }
    ];

    return (
        <section className="bg-white py-16 md:py-24 border-b border-zinc-100">
            <div className="container mx-auto px-6 md:px-10 lg:max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full inline-block">
                                Official Registry
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.1]">
                                Authenticate Your <br className="hidden md:block" />
                                Scout Identity
                            </h2>
                            <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-medium max-w-md">
                                The HSGA Official ID Card is the ultimate proof of registration. It guarantees entry to state events and secures access to official gear.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {features.map((feature, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center">
                                        <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-zinc-900 tracking-tight">{feature.title}</h4>
                                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed font-medium">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <Link
                                href="/id-cards"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full text-sm font-bold shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Apply Now
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Right: Asset/Visual */}
                    <div className="relative flex items-center justify-center group">
                        <img
                            src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772222125/Online_shopping-pana_w91zsf.svg"
                            alt="ID Cards Display"
                            className="w-full max-w-lg h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
