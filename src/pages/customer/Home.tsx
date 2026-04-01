import { useState } from 'react';
import { MapPin, Bell, AlertTriangle, ChevronRight, Star, Zap, Droplets, Shield, Wrench, Sparkles, Armchair, ShoppingBag, Phone, X, CheckCircle2, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CARS = [
    { emoji: '🚗', name: 'Toyota Camry', plate: 'ABC-1234', active: true, km: 48200, lastService: '2025-09-10' },
    { emoji: '🚙', name: 'BMW X5', plate: 'XYZ-5678', active: false, km: 91500, lastService: '2025-06-01' },
];

const SERVICES = [
    { icon: Zap, label: '快洗' },
    { icon: Sparkles, label: '精緻洗車' },
    { icon: Wrench, label: '機器打蠟' },
    { icon: Armchair, label: '內裝美容' },
    { icon: Shield, label: '陶瓷鍍膜' },
    { icon: Droplets, label: '除油膜' },
    { icon: Phone, label: '道路救援' },
    { icon: ShoppingBag, label: '汽車百貨' },
];

const SHOPS = [
    { id: 1, name: 'Elite Auto Spa', rating: 4.9, dist: '1.2 km', services: ['陶瓷鍍膜', '精緻洗車'], img: 'https://images.unsplash.com/photo-1520340356584-f9917d1e511c?w=300&auto=format&fit=crop', tag: '最受歡迎' },
    { id: 2, name: 'QuickWash Express', rating: 4.6, dist: '2.5 km', services: ['快洗', '除油膜'], img: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=300&auto=format&fit=crop', tag: '快速預約' },
];

const TIERS = [
    {
        name: 'Silver', badge: '🥈', range: '0 – 499 P',
        gradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
        perks: ['消費回饋 x1.0', '基礎客服支援', '生日驚喜禮包'],
        current: false,
    },
    {
        name: 'Gold', badge: '🥇', range: '500 – 1,999 P',
        gradient: 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)',
        perks: ['消費回饋 x1.2', '優先預約通道', '商城 9 折', '生日雙倍點數'],
        current: true,
    },
    {
        name: 'Platinum', badge: '💎', range: '2,000 – 4,999 P',
        gradient: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
        perks: ['消費回饋 x1.5', '免定金預約 1次/月', '商城 8.5 折', '專屬客服'],
        current: false,
    },
    {
        name: 'Black', badge: '⬛', range: '5,000 P+',
        gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        perks: ['消費回饋 x2.0', '免定金無上限', '商城 8 折', 'VIP 專屬客服', '優先道路救援媒合'],
        current: false,
    },
];

const SOS_RESCUES = [
    { id: 1, icon: '🔋', label: '電瓶沒電', sub: '跨接啟動服務' },
    { id: 2, icon: '🔧', label: '爆胎救援', sub: '備胎更換到府' },
    { id: 3, icon: '⛽', label: '沒油了', sub: '緊急送油服務' },
    { id: 4, icon: '🚗', label: '拋錨故障', sub: '道路拖吊服務' },
];

export default function Home() {
    const navigate = useNavigate();
    const [activeCar, setActiveCar] = useState(0);
    const [showSOS, setShowSOS] = useState(false);
    const [showMembership, setShowMembership] = useState(false);

    const car = CARS[activeCar];
    const daysSinceService = Math.floor((Date.now() - new Date(car.lastService).getTime()) / 86400000);
    const needsReminder = daysSinceService > 150 || car.km > 90000;

    return (
        <div className="min-h-screen bg-gray-50 pb-28 font-sans">

            {/* ── Header ─────────────────────────────── */}
            <div className="px-5 pt-10 pb-2 flex justify-between items-start">
                <div>
                    <p className="text-[13px] font-semibold text-gray-400">早安 👋</p>
                    <h1 className="text-[24px] font-black tracking-tight text-gray-900">小明</h1>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm">
                        <MapPin size={16} />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm relative">
                        <Bell size={16} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                    </button>
                </div>
            </div>

            {/* ── Maintenance Reminder ─────────────────── */}
            {needsReminder && (
                <div className="mx-5 mb-3 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-[16px] px-4 py-3">
                    <AlertTriangle size={18} className="text-amber-500 shrink-0" />
                    <div className="flex-1">
                        <p className="text-[12px] font-black text-amber-800">
                            {car.km > 90000 ? '里程已超過 9 萬公里，建議安排保養' : `距上次保養已 ${daysSinceService} 天，建議保養`}
                        </p>
                    </div>
                    <button className="text-[11px] font-black text-amber-600 shrink-0">立即預約</button>
                </div>
            )}

            {/* ── Car Garage Chips ─────────────────────── */}
            <div className="px-5 mb-5">
                <div className="flex gap-2 overflow-x-auto nice-scrollbar pb-1">
                    {CARS.map((c, i) => {
                        const isActive = i === activeCar;
                        return (
                            <button
                                key={i}
                                onClick={() => setActiveCar(i)}
                                className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-[14px] border transition-all ${isActive ? 'bg-gray-900 border-gray-900 shadow-lg' : 'bg-white border-gray-200'}`}
                            >
                                <span className="text-xl">{c.emoji}</span>
                                <div className="text-left">
                                    <p className={`text-[12px] font-black leading-tight ${isActive ? 'text-white' : 'text-gray-900'}`}>{c.name}</p>
                                    <p className={`text-[10px] font-semibold ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>{c.plate}</p>
                                </div>
                            </button>
                        );
                    })}
                    <button className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-[14px] border border-dashed border-gray-300 text-gray-400 text-[12px] font-black">
                        + 新增愛車
                    </button>
                </div>
            </div>

            {/* ── Premium Banner ───────────────────────── */}
            <div className="mx-5 mb-5 rounded-[24px] p-5 relative overflow-hidden shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)' }}>
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
                <div className="relative z-10">
                    <div className="text-white/60 text-[11px] font-black uppercase tracking-widest mb-1">限時優惠</div>
                    <h2 className="text-white font-black text-[20px] leading-tight mb-1">Premium 會員升級</h2>
                    <p className="text-white/70 text-[12px] font-semibold mb-3">本月升級享 3 倍點數回饋 · 首次鍍膜 8 折</p>
                    <button
                        onClick={() => setShowMembership(true)}
                        className="bg-white font-black text-[13px] px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all text-gray-900"
                    >
                        了解更多 <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* ── 選擇服務 ─────────────────────────── */}
            <div className="px-5 mb-5">
                <h2 className="text-[15px] font-black text-gray-800 mb-3">選擇服務</h2>
                <div className="grid grid-cols-4 gap-2.5">
                    {SERVICES.map(({ icon: Icon, label }) => (
                        <button key={label}
                            onClick={() => navigate(`/shops?service=${encodeURIComponent(label)}`)}
                            className="flex flex-col items-center p-2.5 rounded-[16px] border border-gray-200 bg-white gap-1.5 active:scale-95 transition-all text-gray-700 hover:border-gray-300">
                            <Icon size={22} strokeWidth={1.8} />
                            <span className="text-[11px] font-black text-center leading-tight">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── 附近熱門店家 ─────────────────────── */}
            <div className="px-5">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[15px] font-black text-gray-800">附近熱門店家</h2>
                    <button className="text-[12px] font-black text-gray-500">查看全部</button>
                </div>
                <div className="space-y-3">
                    {SHOPS.map((shop) => (
                        <div key={shop.id} className="bg-white rounded-[20px] p-3 flex gap-3 shadow-card border border-gray-100 active:scale-[0.99] transition-all">
                            <div className="relative shrink-0">
                                <img src={shop.img} alt={shop.name} className="w-[80px] h-[80px] rounded-[14px] object-cover" />
                                <span className="absolute top-1.5 left-1.5 text-[9px] font-black bg-gray-900 text-white px-1.5 py-0.5 rounded-md">{shop.tag}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-black text-[14px] text-gray-900 leading-tight mb-1">{shop.name}</h3>
                                <div className="flex items-center gap-1 mb-1.5">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <span className="text-[12px] font-black text-gray-700">{shop.rating}</span>
                                    <span className="text-gray-300 mx-1">·</span>
                                    <MapPin size={11} className="text-gray-400" />
                                    <span className="text-[12px] font-medium text-gray-500">{shop.dist}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {shop.services.map((s: string) => (
                                        <span key={s} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <button className="shrink-0 self-center px-3 py-2 rounded-[12px] text-white text-[12px] font-black bg-gray-900">
                                預約
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── SOS ─────────────────────────────────── */}
            <>
                {showSOS && (
                    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.55)' }}
                        onClick={(e) => { if (e.target === e.currentTarget) setShowSOS(false); }}>
                        <div className="bg-white rounded-t-[28px] w-full max-w-[430px] p-5 pb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">🆘</span>
                                <h3 className="text-[17px] font-black text-gray-900">緊急道路救援</h3>
                            </div>
                            <p className="text-[12px] text-gray-500 font-medium mb-4">選擇您需要的救援類型，我們將立即為您媒合最近的門店</p>
                            <div className="space-y-2.5">
                                {SOS_RESCUES.map((r) => (
                                    <button key={r.id} onClick={() => setShowSOS(false)}
                                        className="w-full flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-[16px] active:scale-[0.98] transition-all">
                                        <span className="text-2xl">{r.icon}</span>
                                        <div className="text-left">
                                            <p className="font-black text-[14px] text-gray-900">{r.label}</p>
                                            <p className="text-[11px] text-gray-500 font-medium">{r.sub}</p>
                                        </div>
                                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setShowSOS(false)} className="w-full mt-4 text-[13px] text-gray-400 font-bold">取消</button>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setShowSOS(true)}
                    className="fixed left-5 z-40 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(220,38,38,0.4)] active:scale-95 transition-all"
                    style={{ bottom: '100px' }}
                    title="緊急道路救援"
                >
                    <span className="text-[22px]">🆘</span>
                </button>
            </>

            {/* ══ Membership Tier Bottom Sheet ══════════════════════ */}
            {showMembership && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.55)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowMembership(false); }}>
                    <div className="bg-white rounded-t-[28px] w-full max-w-[430px] mx-auto overflow-hidden flex flex-col" style={{ maxHeight: '88vh' }}>

                        {/* Sheet header */}
                        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
                            <div className="flex items-center gap-2">
                                <Crown size={18} className="text-gray-600" />
                                <h2 className="text-[17px] font-black text-gray-900">會員等級制度</h2>
                            </div>
                            <button onClick={() => setShowMembership(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Current status bar */}
                        <div className="mx-5 mt-4 mb-3 px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0 bg-gray-100">
                            <span className="text-3xl">🥇</span>
                            <div className="flex-1">
                                <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">您目前的等級</p>
                                <p className="text-[16px] font-black text-gray-900">Gold 會員 · 1,500 P</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-500">升級 Platinum</p>
                                <p className="text-[13px] font-black text-gray-900">還差 500 P</p>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mx-5 mb-4 shrink-0">
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-gray-900" style={{ width: '75%' }} />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1">
                                <span>500 P (Gold)</span><span>2,000 P (Platinum)</span>
                            </div>
                        </div>

                        {/* Tier cards scroll */}
                        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3">
                            {TIERS.map((tier) => (
                                <div key={tier.name}
                                    className="rounded-[20px] overflow-hidden"
                                    style={{
                                        background: tier.gradient,
                                        border: tier.current ? '3px solid #374151' : '3px solid transparent',
                                    }}>
                                    <div className="px-4 pt-4 pb-3">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{tier.badge}</span>
                                                <div>
                                                    <p className="text-white font-black text-[16px]">{tier.name}</p>
                                                    <p className="text-white/70 text-[11px] font-semibold">{tier.range}</p>
                                                </div>
                                            </div>
                                            {tier.current && (
                                                <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/40">
                                                    ✓ 目前等級
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            {tier.perks.map((perk) => (
                                                <div key={perk} className="flex items-center gap-2">
                                                    <CheckCircle2 size={13} className="text-white/80 shrink-0" />
                                                    <span className="text-white/90 text-[12px] font-semibold">{perk}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Upgrade CTA */}
                            <button
                                className="w-full py-3.5 rounded-2xl font-black text-[14px] text-white active:scale-95 transition-all mt-2 bg-gray-900 shadow-lg"
                                onClick={() => setShowMembership(false)}
                            >
                                立即消費累積點數 升級等級 →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
