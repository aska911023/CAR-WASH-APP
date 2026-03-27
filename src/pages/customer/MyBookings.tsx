import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Clock, Phone, Share2, CheckCircle, Circle, Car, Camera, AlertTriangle, Navigation } from 'lucide-react';

type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

const BOOKINGS = [
    {
        id: 'BK-5012',
        shop: 'Elite Auto Spa',
        service: '頂級陶瓷鍍膜保養',
        date: '2026-03-06',
        time: '10:00 AM',
        status: 'in_progress' as BookingStatus,
        car: 'Toyota Camry (ABC-1234)',
        address: '台北市中山區中山北路一段 23 號',
        price: 2500,
        photo: 'https://images.unsplash.com/photo-1520340356584-f9917d1e511c?w=400&auto=format&fit=crop',
        progressStep: 2,
    },
    {
        id: 'BK-4998',
        shop: 'QuickWash Express',
        service: '基礎快速洗車',
        date: '2026-03-08',
        time: '02:00 PM',
        status: 'confirmed' as BookingStatus,
        car: 'BMW X5 (XYZ-5678)',
        address: '台北市信義區信義路五段 7 號',
        price: 300,
        photo: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&auto=format&fit=crop',
        progressStep: 0,
    },
    {
        id: 'BK-4875',
        shop: 'Elite Auto Spa',
        service: '尊榮內外雙重清潔',
        date: '2026-02-20',
        time: '11:00 AM',
        status: 'completed' as BookingStatus,
        car: 'Toyota Camry (ABC-1234)',
        address: '台北市中山區中山北路一段 23 號',
        price: 800,
        photo: 'https://images.unsplash.com/photo-1520340356584-f9917d1e511c?w=400&auto=format&fit=crop',
        progressStep: 5,
    },
];

const PROGRESS_STEPS = [
    { label: '預約確認', icon: '✅' },
    { label: '車輛檢測中', icon: '🔍' },
    { label: '保養施工中', icon: '🔧' },
    { label: '洗車中', icon: '💧' },
    { label: '品質檢查', icon: '🏆' },
    { label: '等待取車', icon: '🚗' },
];

const STATUS_MAP: Record<BookingStatus, { label: string; cls: string }> = {
    pending: { label: '待確認', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    confirmed: { label: '已確認', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    in_progress: { label: '服務中', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
    completed: { label: '已完成', cls: 'bg-green-50 text-green-700 border-green-200' },
    cancelled: { label: '已取消', cls: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function MyBookings() {
    const [expanded, setExpanded] = useState<string | null>('BK-5012');
    const [etaSent, setEtaSent] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

    const upcoming = BOOKINGS.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
    const history = BOOKINGS.filter(b => b.status === 'completed' || b.status === 'cancelled');
    const shown = activeTab === 'upcoming' ? upcoming : history;

    return (
        <div className="min-h-screen bg-[#f0f4ff] text-neutral-900 pb-28 font-sans">

            {/* Header */}
            <div className="px-5 pt-10 pb-0 sticky top-0 z-30 bg-[#f0f4ff]">
                <h1 className="text-[22px] font-black tracking-tight text-brand-800 mb-1">我的預約</h1>
                <p className="text-[12px] text-brand-500 font-semibold mb-4">查看預約進度與歷史紀錄</p>
                <div className="flex border-b border-brand-100">
                    {(['upcoming', 'history'] as const).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-[13px] font-black border-b-2 transition-all ${activeTab === tab ? 'text-brand-600 border-brand-600' : 'text-neutral-400 border-transparent'}`}>
                            {tab === 'upcoming' ? `即將到來 (${upcoming.length})` : `歷史紀錄 (${history.length})`}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 pt-4 space-y-3">
                {shown.map(booking => {
                    const st = STATUS_MAP[booking.status];
                    const isOpen = expanded === booking.id;
                    const isActive = booking.status === 'in_progress' || booking.status === 'confirmed';
                    return (
                        <div key={booking.id} className="bg-white rounded-[20px] border border-brand-50 shadow-card overflow-hidden">
                            {/* Shop header image */}
                            <div className="relative h-[100px] overflow-hidden">
                                <img src={booking.photo} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                                    <div>
                                        <p className="text-white font-black text-[15px] leading-tight">{booking.shop}</p>
                                        <p className="text-white/70 text-[11px] font-semibold">{booking.service}</p>
                                    </div>
                                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg border ${st.cls}`}>{st.label}</span>
                                </div>
                                <div className="absolute top-3 left-4 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg">
                                    <span className="text-white text-[10px] font-black">{booking.id}</span>
                                </div>
                            </div>

                            <div className="p-4">
                                {/* Basic info */}
                                <div className="flex gap-4 text-[12px] text-neutral-500 font-semibold mb-3">
                                    <span className="flex items-center gap-1"><Clock size={11} /> {booking.date} {booking.time}</span>
                                    <span className="flex items-center gap-1"><Car size={11} /> {booking.car}</span>
                                </div>

                                {/* Progress timeline for active bookings */}
                                {booking.status === 'in_progress' && (
                                    <div className="mb-4 bg-purple-50 border border-purple-100 rounded-[14px] p-3">
                                        <p className="text-[11px] font-black text-purple-600 uppercase tracking-widest mb-3">服務進度</p>
                                        <div className="space-y-2.5">
                                            {PROGRESS_STEPS.map((step, idx) => {
                                                const done = idx < booking.progressStep;
                                                const current = idx === booking.progressStep;
                                                return (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        {done
                                                            ? <CheckCircle size={18} className="text-green-500 shrink-0" />
                                                            : current
                                                                ? <div className="w-[18px] h-[18px] rounded-full border-2 border-purple-500 bg-purple-100 flex items-center justify-center shrink-0"><div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /></div>
                                                                : <Circle size={18} className="text-gray-200 shrink-0" />
                                                        }
                                                        <span className={`text-[12px] font-bold ${done ? 'text-green-700 line-through' : current ? 'text-purple-700 font-black' : 'text-gray-500'}`}>
                                                            {step.icon} {step.label}
                                                        </span>
                                                        {current && <span className="ml-auto text-[10px] bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full font-black animate-pulse">進行中</span>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Expand/collapse button */}
                                <button
                                    onClick={() => setExpanded(isOpen ? null : booking.id)}
                                    className="w-full flex items-center justify-between py-2 text-[12px] text-neutral-400 font-bold border-t border-neutral-50 mt-1"
                                >
                                    <span>{isOpen ? '收起詳情' : '查看詳情'}</span>
                                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                </button>

                                {/* Expanded detail */}
                                {isOpen && (
                                    <div className="mt-2 space-y-3 animate-in">
                                        {/* Address */}
                                        <div className="flex items-start gap-2 text-[12px] text-neutral-500">
                                            <MapPin size={13} className="text-brand-400 mt-0.5 shrink-0" />
                                            <span className="font-semibold">{booking.address}</span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex justify-between items-center bg-brand-50 rounded-xl px-3 py-2.5">
                                            <span className="text-[12px] font-bold text-brand-600">服務費用</span>
                                            <span className="text-[16px] font-black text-brand-700">{booking.price.toLocaleString()} P</span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {isActive && !etaSent.includes(booking.id) && (
                                                <button
                                                    onClick={() => setEtaSent(prev => [...prev, booking.id])}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-600 text-white rounded-xl text-[12px] font-black shadow-blue-glow active:scale-95 transition-all"
                                                >
                                                    <Navigation size={13} /> 發送預計抵達時間
                                                </button>
                                            )}
                                            {etaSent.includes(booking.id) && (
                                                <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-50 text-green-600 border border-green-200 rounded-xl text-[12px] font-black">
                                                    <CheckCircle size={13} /> ETA 已發送給門店
                                                </div>
                                            )}
                                            <button className="w-11 h-11 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl text-gray-500 active:bg-gray-100 transition-colors">
                                                <Phone size={15} />
                                            </button>
                                            <button className="w-11 h-11 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl text-gray-500 active:bg-gray-100 transition-colors">
                                                <Share2 size={15} />
                                            </button>
                                        </div>

                                        {/* Maintenance reminder for completed */}
                                        {booking.status === 'completed' && (
                                            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                                                <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-[12px] font-black text-amber-700">保養提醒</p>
                                                    <p className="text-[11px] text-amber-600 font-semibold mt-0.5">距上次保養已 13 天，建議 6 個月後（約 8 月）安排下次保養</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Shop photo uploads for in_progress */}
                                        {booking.status === 'in_progress' && (
                                            <div>
                                                <p className="text-[11px] font-black text-neutral-400 mb-2 uppercase tracking-widest">門店施工照片</p>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&auto=format&fit=crop" className="w-full h-20 object-cover rounded-xl border border-brand-50" alt="" />
                                                    <div className="w-full h-20 rounded-xl border-2 border-dashed border-brand-200 bg-brand-50 flex flex-col items-center justify-center text-brand-400 cursor-pointer">
                                                        <Camera size={16} />
                                                        <span className="text-[9px] font-bold mt-1">等待更新</span>
                                                    </div>
                                                    <div className="w-full h-20 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-300">
                                                        <Camera size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
