'use client';

import React, { useState } from 'react';
import { submitIdCardOrder } from '../actions';
import { toast } from 'react-hot-toast';
import { Building2, UserCircle, Phone, Mail, MapPin, Hash, Package, CheckCircle2, Copy, FileText, LayoutTemplate, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function IdCardBulkOrderClient({ template }: { template: any }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [trackingId, setTrackingId] = useState<string | null>(null);

    // Form Data State
    const [formData, setFormData] = useState({
        templateId: template.id,
        templateName: template.name,
        institutionName: '',
        contactPerson: '',
        phone: '',
        email: '',
        quantity: 50,
        address: '',
        city: '',
        state: 'Telangana',
        pincode: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) || 0 : value }));
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.institutionName || !formData.contactPerson || !formData.phone || !formData.email || formData.quantity < 10) {
                toast.error('Please fill all required personal information fields and ensure quantity is at least 10.');
                return;
            }
        }
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
            toast.error('Please completely fill out the delivery address.');
            return;
        }

        setIsSubmitting(true);
        toast.loading('Processing your bulk order...', { id: 'submitOrder' });

        const result = await submitIdCardOrder(formData);

        if (result.success && result.trackingId) {
            toast.success(`Order Placed! Tracking ID: ${result.trackingId}`, { id: 'submitOrder', duration: 5000 });
            setTrackingId(result.trackingId);
            setStep(3); // Go to success step
        } else {
            toast.error(result.error || 'Failed to submit order.', { id: 'submitOrder' });
        }
        setIsSubmitting(false);
    };

    const copyTrackingId = () => {
        if (trackingId) {
            navigator.clipboard.writeText(trackingId);
            toast.success('Tracking ID copied to clipboard!', {
                style: { borderRadius: '12px', background: '#18181b', color: '#fff', fontSize: '12px' }
            });
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 pt-24 pb-20 font-sans">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 inline-block">
                        Official ID Card Bulk Order
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">
                        Secure Checkout
                    </h1>
                    <p className="text-zinc-500 font-medium max-w-lg mx-auto">
                        Complete your institution's custom ID card bulk order. Please ensure all details are highly accurate.
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-12 flex items-center justify-center max-w-md mx-auto">
                    <div className="flex items-center w-full relative z-10">
                        <div className={`flex flex-col items-center flex-1 ${step >= 1 ? 'text-indigo-600' : 'text-zinc-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50' : 'bg-zinc-200'}`}>1</div>
                            <span className="text-[10px] uppercase tracking-widest font-bold">Details</span>
                        </div>
                        <div className={`h-1 w-full flex-1 -mx-8 bg-zinc-200 rounded-full overflow-hidden absolute top-5 -z-10`}>
                            <div className={`h-full bg-indigo-600 transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`} />
                        </div>
                        <div className={`flex flex-col items-center flex-1 ${step >= 2 ? 'text-indigo-600' : 'text-zinc-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= 2 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50' : step > 2 ? 'bg-indigo-600 text-white' : 'bg-zinc-200'}`}>2</div>
                            <span className="text-[10px] uppercase tracking-widest font-bold">Delivery</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-zinc-200/50 overflow-hidden relative">

                    {/* Selected Template Summary Ribbon */}
                    {step < 3 && (
                        <div className="bg-zinc-900 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 text-white">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-zinc-800 rounded-2xl hidden sm:block">
                                    <LayoutTemplate size={24} className="text-zinc-300" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Selected Template</p>
                                    <h3 className="font-bold text-sm truncate max-w-[200px] md:max-w-xs">{template.name}</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 bg-zinc-800/50 px-5 py-3 rounded-2xl border border-zinc-700/50">
                                <div className="text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Total Items</p>
                                    <p className="font-bold text-sm tracking-tight">{formData.quantity}</p>
                                </div>
                                <div className="w-px h-8 bg-zinc-700" />
                                <div className="text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Est. Total</p>
                                    <p className="font-bold text-sm text-green-400 tracking-tight">₹{(formData.quantity * template.price).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {/* Step 1: Personal & Order Information */}
                        {step === 1 && (
                            <form className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-xl font-bold flex items-center gap-3 border-b border-zinc-100 pb-4 mb-6">
                                        <Building2 className="text-indigo-600" size={24} /> Institution Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 col-span-1 md:col-span-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Full Institution Name <span className="text-red-500">*</span></label>
                                            <input type="text" name="institutionName" value={formData.institutionName} onChange={handleInputChange} required className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" placeholder="e.g. Hyderabad Public School, Begumpet" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Primary Contact Person <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" placeholder="Authorized Coordinator" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Phone Number <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" placeholder="+91" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 col-span-1 md:col-span-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" placeholder="coordinator@school.edu.in" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h2 className="text-xl font-bold flex items-center gap-3 border-b border-zinc-100 pb-4 mb-6">
                                        <Package className="text-indigo-600" size={24} /> Order Blueprint
                                    </h2>
                                    <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center gap-6">
                                        <div className="space-y-2 flex-grow w-full">
                                            <label className="text-[11px] font-bold text-indigo-800 uppercase tracking-widest flex items-center gap-2">
                                                <Hash size={14} /> Total ID Cards Quantity <span className="text-red-500">*</span>
                                            </label>
                                            <input type="number" min="10" name="quantity" value={formData.quantity} onChange={handleInputChange} required className="w-full h-16 bg-white border-2 border-indigo-200 rounded-xl px-6 text-2xl font-black text-indigo-900 focus:outline-none focus:border-indigo-500 transition-all" />
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 flex-shrink-0 w-full sm:w-48 text-center space-y-1">
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Base Rate</p>
                                            <p className="text-2xl font-black text-zinc-900 tracking-tight">₹{template.price}</p>
                                            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Per Card</p>
                                        </div>
                                    </div>
                                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-4 ml-2 flex items-center gap-2">
                                        <FileText size={14} /> You will be required to upload an Excel roster upon order approval via Email.
                                    </p>
                                </div>

                                <button type="button" onClick={nextStep} className="w-full h-16 bg-black text-white rounded-2xl font-bold text-sm tracking-wide shadow-xl shadow-black/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 mt-10">
                                    Continue to Delivery <ArrowRight size={18} />
                                </button>
                            </form>
                        )}

                        {/* Step 2: Delivery & Finalization */}
                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                <div>
                                    <h2 className="text-xl font-bold flex items-center gap-3 border-b border-zinc-100 pb-4 mb-6">
                                        <MapPin className="text-indigo-600" size={24} /> Delivery Destination
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 col-span-1 md:col-span-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Full Street Address <span className="text-red-500">*</span></label>
                                            <textarea name="address" value={formData.address} onChange={handleInputChange} required className="w-full min-h-[120px] bg-zinc-50 border border-zinc-200 rounded-2xl p-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium resize-y" placeholder="School/Institution premises exact building location..." />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">City / District <span className="text-red-500">*</span></label>
                                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">State / Region <span className="text-red-500">*</span></label>
                                            <select name="state" value={formData.state} onChange={handleInputChange} required className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium appearance-none">
                                                <option value="Telangana">Telangana</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Other">Other (Special Approval)</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2 col-span-1 md:col-span-2">
                                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Postal / ZIP Code <span className="text-red-500">*</span></label>
                                            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium font-mono text-lg tracking-widest" placeholder="500001" maxLength={6} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200/60 p-5 rounded-2xl shadow-inner mt-8">
                                    <p className="text-[11px] font-bold text-yellow-800 uppercase tracking-widest mb-1 flex items-center gap-2">
                                        Payment Policy Note
                                    </p>
                                    <p className="text-xs text-yellow-700 font-medium leading-relaxed">
                                        Payment is strictly NOT collected on this site. An official invoice containing secure RTGS/NEFT payment details will be sent to the registered email address upon manual verification of your bulk order blueprint.
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-4 mt-10">
                                    <button type="button" onClick={prevStep} className="h-16 px-8 bg-zinc-100 text-zinc-600 rounded-2xl font-bold text-sm tracking-wide hover:bg-zinc-200 transition-all border border-zinc-200">
                                        Back
                                    </button>
                                    <button type="submit" disabled={isSubmitting} className={`flex-1 h-16 rounded-2xl font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.01] shadow-indigo-600/20'}`}>
                                        {isSubmitting ? 'Confirming Protocol...' : 'Confirm Bulk Order'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 3: Success Tracking */}
                        {step === 3 && trackingId && (
                            <div className="text-center py-12 px-6 animate-in zoom-in-95 duration-700 pb-10">
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] mx-auto flex items-center justify-center mb-8 shadow-inner shadow-green-200 border-4 border-white ring-8 ring-green-50 rotate-[-5deg]">
                                    <CheckCircle2 size={48} className="rotate-[5deg]" />
                                </div>
                                <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-4">Request Logged!</h2>
                                <p className="text-zinc-500 font-medium tracking-tight text-lg mb-10 max-w-md mx-auto">
                                    Your secure ID Card Bulk Request template has been successfully routed to the State Headquarters.
                                </p>

                                <div className="bg-zinc-50 border-2 border-zinc-200 border-dashed rounded-[2rem] p-8 max-w-md mx-auto mb-10 relative overflow-hidden group">
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-zinc-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center justify-center gap-2">
                                        <Activity size={12} /> Secure Tracking Protocol ID
                                    </p>
                                    <div className="flex items-center justify-center gap-4 bg-white px-6 py-4 rounded-2xl border border-zinc-200 shadow-sm cursor-pointer hover:border-black transition-colors" onClick={copyTrackingId}>
                                        <span className="text-2xl font-black font-mono tracking-wider text-black">{trackingId}</span>
                                        <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 hover:text-black transition-colors">
                                            <Copy size={16} />
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-6">
                                        Please securely save this ID to monitor real-time order status.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/track-order" className="w-full sm:w-auto h-14 px-8 bg-black text-white rounded-xl font-bold flex items-center justify-center text-sm hover:scale-[1.02] shadow-xl shadow-black/20 transition-all">
                                        Track Order Live
                                    </Link>
                                    <Link href="/id-cards" className="w-full sm:w-auto h-14 px-8 bg-zinc-100 text-zinc-600 rounded-xl font-bold flex items-center justify-center text-sm hover:bg-zinc-200 transition-all">
                                        Back to Registry
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
