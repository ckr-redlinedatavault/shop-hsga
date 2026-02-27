'use client';

import React, { useState } from 'react';
import {
    School,
    Building2,
    ShoppingBag,
    FileUp,
    User,
    Phone,
    ArrowRight,
    CheckCircle2,
    Plus,
    Copy,
    Check,
    Loader2,
    Hash,
    FileText
} from 'lucide-react';
import { submitBulkOrder } from './actions';
import Link from 'next/link';

const BulkOrderPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ success: boolean; trackingId?: string; error?: string } | null>(null);
    const [copied, setCopied] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const res = await submitBulkOrder(formData);
        setResult(res);
        setIsSubmitting(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    const copyTrackingId = () => {
        if (result?.trackingId) {
            navigator.clipboard.writeText(result.trackingId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (result?.success) {
        return (
            <div className="h-[calc(100vh-150px)] w-full flex items-center justify-center px-6 bg-white overflow-hidden">
                <div className="text-center space-y-8 max-w-sm animate-in fade-in zoom-in duration-700">
                    <div className="w-16 h-16 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-100">
                        <CheckCircle2 size={32} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Order Initiated</h1>
                        <p className="text-zinc-500 text-[14px] leading-relaxed">
                            Your institutional request has been logged. Please save your tracking ID for future reference.
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 relative group">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-2">Tracking ID</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-2xl font-mono font-bold text-zinc-900 tracking-wider">
                                {result.trackingId}
                            </span>
                            <button
                                onClick={copyTrackingId}
                                className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-zinc-200"
                            >
                                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-zinc-400" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/track-order"
                            className="w-full py-5 bg-black text-white rounded-[2rem] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-sm shadow-xl shadow-black/10"
                        >
                            Track status
                        </Link>
                        <button
                            onClick={() => setResult(null)}
                            className="text-[13px] font-medium text-zinc-400 hover:text-zinc-900 transition-colors"
                        >
                            Send another request
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        /* Main Wrapper: Fixed height, no page scroll. */
        <div className="bg-white h-[calc(100vh-150px)] overflow-hidden">
            <div className="h-full flex flex-col lg:flex-row-reverse">

                {/* Right Side: Reduced Image */}
                <div className="hidden lg:flex lg:w-5/12 h-full items-center justify-center bg-zinc-50/50 shadow-inner">
                    <div className="w-full max-w-lg p-8">
                        <img
                            src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1772130510/undraw_order-delivered_puaw_xvjr0x.svg"
                            alt="Institutional Supply"
                            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                        />
                    </div>
                </div>

                {/* Left Side: Form Content with Border */}
                <div className="w-full lg:w-7/12 h-full flex items-center justify-center p-6 lg:p-12 overflow-hidden bg-white">
                    <div className="w-full max-w-xl flex flex-col gap-8 h-full justify-center">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Institutional Procurement</span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                                    Bulk Supply Solutions
                                </h1>
                                <p className="text-zinc-500 text-[14px] mt-2 font-medium">
                                    Fulfill your institutional requirements with our streamlined procurement portal.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] h-fit overflow-hidden">
                            <div className="overflow-y-auto pr-3 custom-scrollbar max-h-[50vh]">
                                <form onSubmit={handleSubmit} className="space-y-6 pb-2">
                                    {/* Section: Institution Details */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-medium text-zinc-500 ml-0.5 uppercase tracking-wider">Institution ID</label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={1.2} />
                                                    <input
                                                        type="text"
                                                        name="institutionId"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all outline-none"
                                                        placeholder="HSGA-TS-001"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-medium text-zinc-500 ml-0.5 uppercase tracking-wider">Institution Name</label>
                                                <div className="relative">
                                                    <School className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={1.2} />
                                                    <input
                                                        type="text"
                                                        name="institutionName"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all outline-none"
                                                        placeholder="Official Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-medium text-zinc-500 ml-0.5 uppercase tracking-wider">Order Category</label>
                                                <div className="relative">
                                                    <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={1.2} />
                                                    <select
                                                        name="category"
                                                        required
                                                        className="w-full pl-10 pr-10 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Select Category</option>
                                                        <option value="full-kit">Full Uniform Kit</option>
                                                        <option value="shirts">Shirts only</option>
                                                        <option value="badges">Badges & Emblems</option>
                                                        <option value="accessories">ID Cards & Accessories</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-medium text-zinc-500 ml-0.5 uppercase tracking-wider">Estimated Quantity</label>
                                                <div className="relative">
                                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={1.2} />
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        required
                                                        min="1"
                                                        className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all outline-none"
                                                        placeholder="e.g. 100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: PDF Area */}
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-medium text-zinc-500 ml-0.5 uppercase tracking-wider">Student Details (PDF)</label>
                                        <label className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-100 border-dashed rounded-xl cursor-pointer hover:bg-zinc-100 transition-all group relative overflow-hidden">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-zinc-400 group-hover:text-zinc-900 transition-colors">
                                                {fileName ? <FileText size={16} className="text-zinc-900" /> : <Plus size={16} strokeWidth={2} />}
                                            </div>
                                            <div className="flex-1 truncate">
                                                <p className="text-[12px] font-medium text-zinc-900 leading-none truncate">
                                                    {fileName ? fileName : 'Upload procurement list'}
                                                </p>
                                                <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">
                                                    {fileName ? 'File selected' : 'PDF max 10MB'}
                                                </p>
                                            </div>
                                            {fileName && (
                                                <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-tight anime-in fade-in">
                                                    <Check size={12} />
                                                    Added
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                name="studentDetails"
                                                accept=".pdf"
                                                required
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>

                                    {/* Section: Contact */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-medium text-zinc-500 ml-0.5 uppercase tracking-wider">Contact Person</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={1.2} />
                                                <input
                                                    type="text"
                                                    name="contactPerson"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all outline-none"
                                                    placeholder="Full Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-medium text-zinc-500 ml-0.5 uppercase tracking-wider">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={1.2} />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all outline-none"
                                                    placeholder="+91"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-5 bg-black text-white rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-black/10"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <span className="text-sm font-bold">Send Inquiry</span>
                                                    <ArrowRight size={18} strokeWidth={3} />
                                                </>
                                            )}
                                        </button>
                                        {result?.error && (
                                            <p className="text-center text-red-500 text-[11px] mt-2 font-medium">
                                                {result.error}
                                            </p>
                                        )}
                                        <p className="text-center text-[10px] text-zinc-400 mt-4 font-medium uppercase tracking-[0.2em] leading-none mb-2">
                                            HSGA Telangana
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f4f4f5;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #e4e4e7;
                }
            `}</style>
        </div>
    );
};

export default BulkOrderPage;