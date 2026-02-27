'use client';

import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { adminLogin } from './actions';

const AdminLoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await adminLogin(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-xl">
                        <ShieldCheck className="text-white" size={32} strokeWidth={1.5} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                    Admin Portal
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Hindustan Scouts and Guides Association
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[400px]">
                <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-zinc-400 ml-1 mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-transparent rounded-2xl text-sm text-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:bg-white focus:border-zinc-200 transition-all outline-none"
                                    placeholder="admin@hsga.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-zinc-400 ml-1 mb-2">
                                Security Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-transparent rounded-2xl text-sm text-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:bg-white focus:border-zinc-200 transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 px-4 bg-zinc-900 text-white text-[15px] font-semibold rounded-2xl hover:bg-black transition-all transform active:scale-[0.98] shadow-lg shadow-zinc-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Checking...' : 'Enter Dashboard'}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-[10px] text-zinc-300 uppercase tracking-[0.2em] font-medium">
                    Restricted Access • Authorized Personnel Only
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
