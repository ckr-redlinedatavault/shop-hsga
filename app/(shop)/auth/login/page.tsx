'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    return (
        <div className="min-h-[calc(100vh-160px)] bg-white flex flex-col justify-center py-20 px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                    Welcome back
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Sign in to your account to continue
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-[400px]">
                {/* Main Login Card */}
                <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                    <form className="space-y-6" action="#" method="POST">

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-zinc-400 ml-1 mb-2">
                                Email Address
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
                                    autoComplete="email"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-transparent rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#ff5e00]/10 focus:bg-white focus:border-zinc-200 transition-all outline-none appearance-none"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-zinc-400 ml-1 mb-2">
                                Password
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
                                    autoComplete="current-password"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-transparent rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#ff5e00]/10 focus:bg-white focus:border-zinc-200 transition-all outline-none appearance-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Options: Remember & Forgot */}
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#ff5e00] focus:ring-[#ff5e00]/10 border-zinc-200 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-[12px] text-zinc-500 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-[12px]">
                                <a href="#" className="font-medium text-zinc-900 hover:text-[#ff5e00] transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="group w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#ff5e00] text-white text-[15px] font-semibold rounded-2xl hover:bg-[#e45400] transition-all transform active:scale-[0.98] shadow-lg shadow-orange-500/10"
                            >
                                Sign in
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Link */}
                <div className="mt-10 text-center">
                    <p className="text-[13px] text-zinc-500">
                        Don't have an account?{' '}
                        <Link
                            href="/auth/register"
                            className="font-semibold text-zinc-900 hover:text-[#ff5e00] transition-colors underline underline-offset-4 decoration-zinc-200 hover:decoration-[#ff5e00]"
                        >
                            Create an account
                        </Link>
                    </p>
                    <p className="mt-8 text-[10px] text-zinc-300 uppercase tracking-[0.2em] font-medium">
                        Hsga Telangana Official Store
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;