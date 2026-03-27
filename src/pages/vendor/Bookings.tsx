import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, X, Search, Filter, UserCheck, Camera, ChevronDown } from 'lucide-react';

const TECHNICIANS = ['全部人員', '技師 - 張大明', '技師 - 李小華', '技師 - 陳志遠'];

const PROGRESS_STEPS = ['車輛检测中', '保養施工中', '洗車中', '等待取車'];

const RESERVATIONS = [
    { id: '1', customer: 'John Doe', service: '頂級陶瓷鍍膜保養', date: '2026-03-05', time: '10:00 AM', status: 'pending', car: 'BMW X5 (Black)', technician: '' },
    { id: '2', customer: 'Sarah Smith', service: '基礎快速洗車', date: '2026-03-05', time: '01:00 PM', status: 'confirmed', car: 'Tesla Model 3 (White)', technician: '技師 - 張大明' },
    { id: '3', customer: 'Mike Johnson', service: '尊榮內外雙重清潔', date: '2026-03-05', time: '03:30 PM', status: 'in_progress', car: 'Ford F-150 (Silver)', technician: '技師 - 李小華', progressStep: 1 },
    { id: '4', customer: 'Emily Chen', service: '基礎快速洗車', date: '2026-03-06', time: '09:00 AM', status: 'confirmed', car: 'Toyota Camry (Blue)', technician: '' },
    { id: '5', customer: 'Alex Rodriguez', service: '尊榮內外雙重清潔', date: '2026-03-06', time: '11:15 AM', status: 'pending', car: 'Honda Civic (Red)', technician: '' },
    { id: '6', customer: 'Lisa Wang', service: '機器打蠟', date: '2026-03-04', time: '02:00 PM', status: 'cancelled', car: 'Mazda CX-5 (White)', technician: '' },
];

type StatusKey = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

const STATUS_CONFIG: Record<StatusKey, { label: string; badge: string }> = {
    pending: { label: '待確認', badge: 'badge-pending' },
    confirmed: { label: '已接受', badge: 'badge-confirmed' },
    in_progress: { label: '服務中', badge: 'bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-black px-2.5 py-1 rounded-full' },
    completed: { label: '已完成', badge: 'badge-completed' },
    cancelled: { label: '已取消', badge: 'badge-cancelled' },
};

const TABS = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待確認' },
    { key: 'confirmed', label: '已接受' },
    { key: 'in_progress', label: '服務中' },
    { key: 'completed', label: '已完成' },
];

export default function Bookings() {
    const [filter, setFilter] = useState('all');
    const [bookings, setBookings] = useState(RESERVATIONS.map(r => ({ ...r, showTech: false, progressStep: (r as any).progressStep ?? 0 })));

    const filtered = bookings.filter(r => filter === 'all' || r.status === filter);

    const assignTech = (id: string, tech: string) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, technician: tech, showTech: false } : b));
    };

    const advanceProgress = (id: string) => {
        setBookings(prev => prev.map(b => b.id === id
            ? { ...b, progressStep: Math.min((b.progressStep ?? 0) + 1, PROGRESS_STEPS.length - 1), status: 'in_progress' as any }
            : b));
    };

    return (
        <div className="text-gray-900 bg-white p-5 pb-24 font-sans">
            {/* Header */}
            <div className="mb-5 pt-2">
                <h1 className="text-[24px] font-black tracking-tight text-gray-900 mb-0.5">預約管理</h1>
                <p className="text-[13px] text-gray-400 font-semibold">查看並管理即將到來的客戶預約</p>
            </div>

            {/* Search + Filter */}
            <div className="flex gap-2 mb-5">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 flex-1 focus-within:border-brand-400 transition-all">
                    <Search size={16} className="text-gray-400 mr-2 shrink-0" />
                    <input type="text" placeholder="搜尋客戶或編號..." className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-400 text-[13px] font-medium" />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-600 font-black">
                    <Filter size={15} /> 篩選
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 mb-5 overflow-x-auto nice-scrollbar">
                {TABS.map(tab => (
                    <button key={tab.key} onClick={() => setFilter(tab.key)}
                        className={`px-3 py-2.5 whitespace-nowrap font-black text-[13px] transition-all border-b-2 ${filter === tab.key ? 'border-brand-600 text-brand-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>
                        {tab.label}
                        <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-black ${filter === tab.key ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-400'}`}>
                            {RESERVATIONS.filter(r => tab.key === 'all' || r.status === tab.key).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Booking Cards */}
            <div className="flex flex-col gap-3">
                {filtered.map(res => {
                    const cfg = STATUS_CONFIG[res.status as StatusKey];
                    return (
                        <div key={res.id} className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                            {/* Top row */}
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-black text-[15px] text-gray-900 leading-tight">{res.customer}</h3>
                                    <p className="text-[12px] text-gray-400 font-semibold mt-0.5">{res.car}</p>
                                </div>
                                <span className={cfg.badge}>{cfg.label}</span>
                            </div>

                            {/* Detail */}
                            <div className="bg-gray-50 rounded-[14px] p-3 mb-3 text-[12px] space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-bold">服務項目</span>
                                    <span className="font-black text-gray-800 bg-white px-2 py-0.5 rounded-lg border border-gray-100 text-[11px]">{res.service}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-2">
                                    <span className="text-gray-400 font-bold">時間</span>
                                    <div className="flex items-center gap-3 font-semibold text-gray-700">
                                        <span className="flex items-center gap-1"><CalendarIcon size={11} className="text-gray-400" /> {res.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={11} className="text-gray-400" /> {res.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Technician Assignment */}
                            {(res.status === 'confirmed' || res.status === 'in_progress') && (
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <UserCheck size={13} className="text-brand-500" />
                                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">指派技師</span>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setBookings(prev => prev.map(b => b.id === res.id ? { ...b, showTech: !b.showTech } : { ...b, showTech: false }))}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-[13px] font-bold transition-all ${res.technician ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <UserCheck size={14} />
                                                {res.technician || '尚未指派技師'}
                                            </span>
                                            <ChevronDown size={14} />
                                        </button>
                                        {res.showTech && (
                                            <div className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 overflow-hidden">
                                                {TECHNICIANS.slice(1).map(tech => (
                                                    <button key={tech} onClick={() => assignTech(res.id, tech)}
                                                        className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors">
                                                        {tech}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Progress steps for in_progress */}
                            {res.status === 'in_progress' && (
                                <div className="mb-3 bg-purple-50 border border-purple-100 rounded-[14px] p-3">
                                    <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-2">服務進度</p>
                                    <div className="flex items-center justify-between">
                                        {PROGRESS_STEPS.map((step, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <div className={`flex flex-col items-center ${idx <= (res.progressStep ?? 0) ? 'opacity-100' : 'opacity-30'}`}>
                                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border-2 ${idx < (res.progressStep ?? 0) ? 'bg-green-500 border-green-500 text-white' : idx === (res.progressStep ?? 0) ? 'bg-purple-600 border-purple-600 text-white animate-pulse' : 'bg-white border-gray-200 text-gray-400'}`}>
                                                        {idx < (res.progressStep ?? 0) ? '✓' : idx + 1}
                                                    </div>
                                                    <span className="text-[9px] font-bold text-purple-600 mt-1 max-w-[50px] text-center leading-tight">{step}</span>
                                                </div>
                                                {idx < PROGRESS_STEPS.length - 1 && <div className={`w-4 h-0.5 ${idx < (res.progressStep ?? 0) ? 'bg-green-400' : 'bg-gray-200'} mb-4 mx-0.5`} />}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => advanceProgress(res.id)}
                                        className="w-full mt-2 py-2 bg-purple-600 text-white font-black text-[12px] rounded-[10px] active:bg-purple-700 transition-colors">
                                        推進至下一步驟
                                    </button>
                                </div>
                            )}

                            {/* Action buttons */}
                            {res.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-xl text-[13px] font-black flex items-center justify-center gap-1.5 active:bg-green-100 transition-colors">
                                        <Check size={15} strokeWidth={2.5} /> 接受預約
                                    </button>
                                    <button className="w-11 h-11 bg-red-50 text-red-500 border border-red-200 rounded-xl flex items-center justify-center active:bg-red-100 transition-colors">
                                        <X size={15} strokeWidth={2.5} />
                                    </button>
                                </div>
                            )}
                            {res.status === 'confirmed' && (
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-[13px] font-black active:bg-purple-100 transition-colors flex items-center justify-center gap-1.5">
                                        🚗 開始服務
                                    </button>
                                    <button className="w-11 h-11 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 active:bg-gray-100 transition-colors">
                                        <Camera size={15} />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div className="p-10 bg-gray-50 rounded-[20px] border border-gray-100 text-center text-gray-400 font-black flex flex-col items-center">
                        <CalendarIcon size={36} className="text-gray-200 mb-3" />沒有找到相關預約
                    </div>
                )}
            </div>
        </div>
    );
}
