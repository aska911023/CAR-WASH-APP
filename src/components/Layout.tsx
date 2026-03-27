import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, CalendarCheck, Store, ShoppingBag, User, LogOut, Home, MapPin, MessageSquare, Users, CalendarDays } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { state, logout } = useAppContext();
    const location = useLocation();

    const vendorLinks = [
        { label: '數據', path: '/', icon: ShieldCheck },
        { label: '預約', path: '/bookings', icon: CalendarCheck },
        { label: '主頁', path: '/shop', icon: Store },
        { label: '商品', path: '/products', icon: ShoppingBag },
        { label: '訊息', path: '/chat', icon: MessageSquare },
    ];

    const customerLinks = [
        { label: '首頁', path: '/', icon: Home },
        { label: '找店', path: '/shops', icon: MapPin },
        { label: '車友圈', path: '/community', icon: Users },
        { label: '預約', path: '/mybookings', icon: CalendarDays },
        { label: '我的', path: '/profile', icon: User },
    ];

    const links = state.role === 'vendor' ? vendorLinks : customerLinks;
    const isVendor = state.role === 'vendor';

    return (
        <div className={`h-screen flex justify-center overflow-hidden font-sans ${isVendor ? 'bg-gray-100' : 'bg-slate-200'}`}>
            {/* Mobile Container */}
            <div className={`w-full max-w-[430px] h-full flex flex-col relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.12)] ${isVendor ? 'bg-white' : 'bg-[#f0f4ff]'}`}>

                {/* Vendor Header */}
                {isVendor && (
                    <header className="px-5 pt-12 pb-3.5 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-40">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-sm">
                                <ShieldCheck size={16} className="text-white" strokeWidth={2.5} />
                            </div>
                            <h1 className="text-[17px] font-black tracking-tight text-gray-900">WashHub <span className="text-brand-600">Pro</span></h1>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors"
                            title="切換身份 / 登出"
                        >
                            <LogOut size={13} strokeWidth={2.5} />
                            登出
                        </button>
                    </header>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto nice-scrollbar">
                    {children}
                </main>

                {/* Bottom Navigation */}
                <div className={`sticky bottom-0 w-full border-t pb-7 pt-2 px-1 flex justify-around items-center z-40 shrink-0 ${isVendor
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-white border-brand-50 shadow-[0_-4px_24px_rgba(37,99,235,0.06)]'
                    }`}>
                    {links.map((link) => {
                        const Icon = link.icon;
                        const active = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex flex-col items-center gap-1 min-w-[48px] transition-all duration-200 outline-none ${active
                                    ? isVendor ? 'text-brand-700' : 'text-brand-600'
                                    : isVendor ? 'text-gray-400 hover:text-gray-600' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <div className={`relative flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200 ${active ? (isVendor ? 'bg-brand-50' : 'bg-brand-100') : ''
                                    }`}>
                                    <Icon size={21} strokeWidth={active ? 2.5 : 2} />
                                    {active && <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-500" />}
                                </div>
                                <span className={`text-[10px] tracking-wide ${active ? 'font-black' : 'font-medium'}`}>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
