'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Package,
    FileText,
    ChevronLeft,
    Menu,
    Bell,
    School,
    Database
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/admin/dashboard' },
        { icon: School, label: 'Bulk Orders', href: '/admin/dashboard/bulk-orders' },
        { icon: Package, label: 'Products', href: '/admin/dashboard/products' },
        { icon: ShoppingBag, label: 'Uniforms', href: '/admin/dashboard/uniforms' },
        { icon: Database, label: 'ID Cards', href: '/admin/dashboard/id-cards' },
        { icon: ShoppingBag, label: 'Orders', href: '/admin/dashboard/orders' },
        { icon: Users, label: 'Customers', href: '/admin/dashboard/customers' },
        { icon: FileText, label: 'Inventory', href: '/admin/dashboard/inventory' },
        { icon: Settings, label: 'Settings', href: '/admin/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-zinc-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-100">
                        <Link href="/admin/dashboard" className={`flex items-center gap-3 ${!isSidebarOpen && 'hidden'}`}>
                            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-bold">H</span>
                            </div>
                            <span className="font-bold text-zinc-900 tracking-tight text-sm">HSGA ADMIN</span>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-1.5 rounded-lg bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                            {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200'
                                        : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                                        }`}
                                >
                                    <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                                    <span className={`text-sm font-medium ${!isSidebarOpen && 'hidden'}`}>
                                        {item.label}
                                    </span>
                                    {isActive && isSidebarOpen && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-zinc-100">
                        <Link
                            href="/admin/login"
                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                        >
                            <LogOut size={20} />
                            <span className={`text-sm font-medium ${!isSidebarOpen && 'hidden'}`}>
                                Sign Out
                            </span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Dashboard Top Nav */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-zinc-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div>
                        <h1 className="text-lg font-bold text-zinc-900">
                            {menuItems.find(item => item.href === pathname)?.label || 'Dashboard'}
                        </h1>
                        <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-widest mt-0.5">
                            HSGA Telangana State
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 text-zinc-400 hover:text-zinc-900 transition-colors bg-zinc-50 rounded-xl">
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                        </button>
                        <div className="h-8 w-px bg-zinc-200 mx-2" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right">
                                <p className="text-sm font-bold text-zinc-900 leading-none">Admin User</p>
                                <p className="text-[10px] text-zinc-400 mt-1 uppercase font-medium">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200 overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=Admin+User&background=09090b&color=fff" alt="Avatar" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardLayout;
