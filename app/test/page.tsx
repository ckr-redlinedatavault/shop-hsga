'use client';

import { useState } from 'react';
import { createUser } from './actions';

export default function ConnectionTestPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('Attempting to create user...');

        try {
            const response = await createUser(email, name);
            if (response.success) {
                setStatus(`Successfully created user: ${response.user?.email} (ID: ${response.user?.id})`);
                setEmail('');
                setName('');
            } else {
                setStatus(`Database Error: ${response.error}`);
            }
        } catch (error) {
            setStatus(`System Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
            <div className="w-full max-w-lg p-1 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-3xl">
                <div className="bg-zinc-900 border border-zinc-800 rounded-[calc(1.5rem-4px)] p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="white">
                            <rect x="10" y="10" width="80" height="80" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="10 5" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-yellow-500">Shop</span> Connection Test
                    </h1>
                    <p className="text-zinc-400 text-sm mb-8">
                        Create a test user to verify your Supabase database is reachable via Prisma.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="test@example.com"
                                className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/10 text-white rounded-xl px-4 py-3 outline-none transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-1">Name (Optional)</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Test User"
                                className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/10 text-white rounded-xl px-4 py-3 outline-none transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold transform transition-all duration-300 shadow-xl ${loading
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                    : 'bg-yellow-500 hover:bg-yellow-400 text-black hover:-translate-y-1 active:scale-95 shadow-yellow-500/10'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                'Create Test User'
                            )}
                        </button>
                    </form>

                    {status && (
                        <div className={`mt-8 p-4 rounded-2xl text-xs font-mono leading-relaxed border backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500 ${status.includes('Successfully')
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/5 border-red-500/20 text-red-400'
                            }`}>
                            <div className="flex gap-2">
                                <span className="text-zinc-500">{'>'}</span>
                                <p>{status}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
