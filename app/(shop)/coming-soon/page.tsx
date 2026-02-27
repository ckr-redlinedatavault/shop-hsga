export default function ComingSoonPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-zinc-50 px-6">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-zinc-100 rounded-3xl mx-auto flex items-center justify-center rotate-12 mb-8">
                    <svg className="w-10 h-10 text-zinc-900 -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
                    Coming Soon
                </h1>

                <p className="text-zinc-500 font-medium leading-relaxed">
                    We're currently crafting down to the last fiber. The official HSGA Accessories collection will be available here shortly.
                </p>

                <div className="pt-8">
                    <a href="/uniforms" className="inline-flex h-12 items-center justify-center rounded-xl bg-zinc-900 px-8 text-sm font-bold text-white transition-colors hover:bg-zinc-800">
                        Explore Uniforms
                    </a>
                </div>
            </div>
        </div>
    );
}
