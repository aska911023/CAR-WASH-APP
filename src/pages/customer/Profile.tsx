import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Wallet, CreditCard, History, Settings, ChevronRight, Car, BadgeCheck, Tag, Gift, Ticket, Star, LogOut } from 'lucide-react';

const MEMBER_TIERS = [
    { name: 'Silver', color: 'from-gray-400 to-gray-500', min: 0, max: 499, badge: '🥈', perks: ['消費回饋 x1.0', '基礎客服', '生日驚喜'] },
    { name: 'Gold', color: 'from-gray-500 to-gray-600', min: 500, max: 1999, badge: '🥇', perks: ['消費回饋 x1.2', '優先預約', '商城 9 折', '生日雙倍點數'] },
    { name: 'Platinum', color: 'from-gray-600 to-gray-800', min: 2000, max: 4999, badge: '💎', perks: ['消費回饋 x1.5', '免定金預約 1次/月', '商城 8.5 折', '專屬客服'] },
    { name: 'Black', color: 'from-gray-800 to-gray-900', min: 5000, max: Infinity, badge: '⬛', perks: ['消費回饋 x2.0', '免定金無上限', '商城 8 折', 'VIP 專屬客服', '優先媒合道路救援'] },
];

const COUPONS = [
    { id: 'C1', title: '新人禮包', desc: '任意洗車服務享 9 折優惠', expire: '2026-04-30', type: 'percent', value: 10, used: false, gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)' },
    { id: 'C2', title: '生日優惠券', desc: '指定精緻洗車免費乙次', expire: '2026-03-31', type: 'free', value: 0, used: false, gradient: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)' },
    { id: 'C3', title: '推薦獎勵', desc: '點數商城抵用 100P', expire: '2026-06-30', type: 'points', value: 100, used: false, gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' },
    { id: 'C4', title: '首購優惠', desc: '首次陶瓷鍍膜折抵 300P', expire: '2026-02-28', type: 'points', value: 300, used: true, gradient: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' },
];

export default function Profile() {
    const { state, addPoints, logout } = useAppContext();
    const [showTopup, setShowTopup] = useState(false);
    const [showTiers, setShowTiers] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleTopup = (amount: number) => { addPoints(amount); setShowTopup(false); };

    const tier = MEMBER_TIERS.find(t => state.points >= t.min && state.points <= t.max) || MEMBER_TIERS[0];
    const nextTier = MEMBER_TIERS[MEMBER_TIERS.indexOf(tier) + 1];
    const progress = nextTier ? Math.min(((state.points - tier.min) / (nextTier.min - tier.min)) * 100, 100) : 100;
    const activeCoupons = COUPONS.filter(c => !c.used);

    return (
        <div className="min-h-screen text-gray-900 bg-gray-50 pb-28 font-sans">

            {/* ── User Hero ───────────────────────── */}
            <div className={`relative bg-gradient-to-br ${tier.color} px-5 pt-12 pb-8`}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='23' cy='23' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }} />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-[18px] bg-white/30 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center text-3xl shadow-lg">🧑</div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                            <h2 className="text-white font-black text-[20px] leading-tight">車主小明</h2>
                            <div className="flex items-center gap-1 bg-white/25 px-2 py-0.5 rounded-full">
                                <BadgeCheck size={12} className="text-white" />
                                <span className="text-white text-[10px] font-black">{tier.badge} {tier.name}</span>
                            </div>
                        </div>
                        <p className="text-white/70 text-[12px] font-semibold">會員 ID：WH-78291</p>
                    </div>
                </div>

                {nextTier && (
                    <div className="mt-4 relative z-10">
                        <div className="flex justify-between text-[11px] text-white/80 font-bold mb-1.5">
                            <span>{tier.name}  {state.points} P</span>
                            <span>升級至 {nextTier.name} 還差 {nextTier.min - state.points} P</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                <button onClick={() => setShowTiers(true)} className="mt-3 relative z-10 text-[11px] text-white/70 font-black flex items-center gap-1">
                    查看會員等級權益 <ChevronRight size={13} />
                </button>
            </div>

            <div className="px-5 pt-4">

                {/* ── Coupon Wallet ────────────────── */}
                <div className="bg-white rounded-[24px] shadow-card border border-gray-100 p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-[15px] font-black text-gray-800 flex items-center gap-2">
                            <Ticket size={16} className="text-gray-500" /> 優惠券錢包
                        </h3>
                        <span className="text-[11px] font-black bg-gray-900 text-white px-1.5 py-0.5 rounded-full">{activeCoupons.length} 張可用</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 nice-scrollbar" style={{ paddingLeft: '2px', paddingRight: '4px' }}>
                        {COUPONS.map(coupon => {
                            const bg = coupon.used ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' : coupon.gradient;
                            return (
                                <div key={coupon.id}
                                    className={`shrink-0 w-[155px] h-[140px] rounded-[16px] relative overflow-hidden flex flex-col ${coupon.used ? 'opacity-50' : ''}`}
                                    style={{ background: bg }}>
                                    <div className="relative z-10 flex-1 p-3">
                                        <div className="flex items-start justify-between mb-1.5">
                                            <Gift size={16} className="text-white/80" />
                                            {coupon.used && <span className="text-[9px] font-black bg-black/20 text-white px-1.5 py-0.5 rounded">已使用</span>}
                                        </div>
                                        <p className="text-white font-black text-[13px] leading-tight">{coupon.title}</p>
                                        <p className="text-white/80 text-[10px] font-semibold mt-0.5 leading-tight">{coupon.desc}</p>
                                        <p className="text-white/60 text-[9px] font-bold mt-2">效期 {coupon.expire}</p>
                                    </div>
                                    {!coupon.used && (
                                        <div className="relative z-10 border-t border-dashed border-white/30 bg-black/10 text-center py-1.5">
                                            <span className="text-white font-black text-[11px]">立即使用</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── My Cars ─────────────────────── */}
                <div className="bg-white rounded-[24px] shadow-card border border-gray-100 p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-[15px] font-black text-gray-800 flex items-center gap-2"><Car size={16} className="text-gray-500" /> 我的車庫</h3>
                        <button className="text-[12px] font-black text-gray-500">管理</button>
                    </div>
                    <div className="flex gap-2">
                        {[
                            { emoji: '🚗', name: 'Toyota Camry', plate: 'ABC-1234', active: true },
                            { emoji: '🚙', name: 'BMW X5', plate: 'XYZ-5678', active: false },
                        ].map((car, i) => (
                            <div key={i} className={`flex-1 p-3 rounded-[16px] border transition-all ${car.active ? 'bg-gray-50 border-gray-300' : 'bg-gray-50 border-gray-100'}`}>
                                <span className="text-2xl block mb-1.5">{car.emoji}</span>
                                <p className={`text-[12px] font-black ${car.active ? 'text-gray-900' : 'text-gray-600'}`}>{car.name}</p>
                                <p className={`text-[10px] font-bold tracking-wider ${car.active ? 'text-gray-500' : 'text-gray-400'}`}>{car.plate}</p>
                                {car.active && <div className="mt-1.5 w-full h-0.5 rounded-full bg-gray-900" />}
                            </div>
                        ))}
                        <div className="w-[70px] p-3 rounded-[16px] border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-1 text-gray-400 cursor-pointer">
                            <span className="text-xl font-bold">+</span>
                            <span className="text-[10px] font-bold text-center leading-tight">新增車輛</span>
                        </div>
                    </div>
                </div>

                {/* ── Wallet Card ─────────────────── */}
                <div className="bg-gray-900 rounded-[24px] p-6 relative overflow-hidden shadow-lg mb-4">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px]" />
                    <p className="text-gray-400 text-[12px] font-bold flex items-center gap-1.5 mb-1 relative z-10"><Wallet size={14} /> 點數餘額</p>
                    <h2 className="text-[42px] font-black text-white tracking-tight relative z-10">{state.points.toLocaleString()} <span className="text-lg text-gray-400 font-bold">P</span></h2>
                    <div className="flex items-center gap-2 mb-5 relative z-10">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-[12px] text-gray-400 font-semibold">{tier.badge} {tier.name} 會員 · 回饋率 x{[1.0, 1.2, 1.5, 2.0][MEMBER_TIERS.indexOf(tier)]}</span>
                    </div>
                    <button onClick={() => setShowTopup(!showTopup)} className="w-full py-3.5 bg-white text-gray-900 rounded-[16px] font-black flex items-center justify-center gap-2 shadow-lg active:bg-gray-100 transition-all relative z-10">
                        <CreditCard size={17} /> 儲值點數
                    </button>
                </div>

                {/* Top-up Panel */}
                {showTopup && (
                    <div className="bg-white border border-gray-200 rounded-[24px] p-5 mb-4 shadow-card">
                        <h3 className="text-[16px] font-black text-gray-900 mb-1">選擇儲值金額</h3>
                        <p className="text-[12px] text-gray-400 font-medium mb-4">1 點 = $1 元</p>
                        <div className="grid grid-cols-2 gap-2.5 mb-4">
                            {[500, 1000, 2500, 5000].map(amt => (
                                <button key={amt} onClick={() => handleTopup(amt)} className="p-4 border border-gray-200 bg-gray-50 rounded-[16px] active:border-gray-400 active:bg-gray-100 transition-all flex flex-col items-center focus:outline-none">
                                    <span className="text-[20px] font-black text-gray-900">{amt} P</span>
                                    <span className="text-[12px] font-bold text-gray-400">${amt}</span>
                                    {amt >= 2500 && <span className="mt-1.5 text-[10px] bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded font-black">+10% 贈點</span>}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setShowTopup(false)} className="w-full text-[13px] text-gray-400 font-bold active:text-gray-700">取消</button>
                    </div>
                )}

                {/* ── Settings ────────────────────── */}
                <div className="bg-white border border-gray-100 rounded-[24px] p-2 shadow-card mb-4">
                    {[
                        { icon: History, label: '交易紀錄', color: 'text-gray-600 bg-gray-100' },
                        { icon: Tag, label: '我的優惠碼', color: 'text-gray-600 bg-gray-100' },
                        { icon: Settings, label: '帳號設定', color: 'text-gray-600 bg-gray-100' },
                    ].map(({ icon: Icon, label, color }, i, arr) => (
                        <div key={label}>
                            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 rounded-[18px] transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${color}`}><Icon size={17} /></div>
                                    <span className="font-black text-[14px] text-gray-800">{label}</span>
                                </div>
                                <ChevronRight size={17} className="text-gray-300 group-active:translate-x-1 transition-transform" />
                            </button>
                            {i < arr.length - 1 && <div className="h-px bg-gray-100 mx-4" />}
                        </div>
                    ))}
                </div>

                {/* ── Logout Button ──────────── */}
                <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[20px] border border-red-100 bg-red-50 active:bg-red-100 transition-all mb-4"
                >
                    <LogOut size={16} className="text-red-500" />
                    <span className="font-black text-[14px] text-red-500">登出</span>
                </button>

                {/* ── Recent Activity ─────────────── */}
                <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-card">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[15px] font-black text-gray-900">近期活動</h3>
                        <span className="text-[11px] font-black text-gray-500 cursor-pointer">查看全部</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: 'Elite Auto Spa', sub: '基礎快速洗車', delta: '-300', positive: false },
                            { label: '錢包點數儲值', sub: 'Apple Pay', delta: '+1000', positive: true },
                            { label: '點數商城消費', sub: '頂級棕櫚蠟 x1', delta: '-120', positive: false },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center text-lg font-black border ${item.positive ? 'bg-gray-50 border-gray-200 text-gray-900' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                                        {item.positive ? '+' : '-'}
                                    </div>
                                    <div>
                                        <p className="font-black text-[13px] text-gray-900 leading-tight">{item.label}</p>
                                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.sub}</p>
                                    </div>
                                </div>
                                <span className={`font-black text-[14px] ${item.positive ? 'text-green-600' : 'text-gray-700'}`}>{item.delta} P</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Logout Confirm Sheet ────────────── */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowLogoutConfirm(false)}>
                    <div className="bg-white w-full max-w-[430px] rounded-t-[32px] p-6 pb-10" onClick={e => e.stopPropagation()}>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-3">
                                <LogOut size={22} className="text-red-500" />
                            </div>
                            <h2 className="text-[18px] font-black text-gray-900 mb-1">確定要登出嗎？</h2>
                            <p className="text-[13px] text-gray-400 font-medium">登出後將返回角色選擇畫面</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 py-3.5 rounded-2xl font-black text-[14px] text-gray-700 bg-gray-100 active:bg-gray-200 transition-all"
                            >
                                取消
                            </button>
                            <button
                                onClick={() => { setShowLogoutConfirm(false); logout(); }}
                                className="flex-1 py-3.5 rounded-2xl font-black text-[14px] text-white bg-red-500 active:bg-red-600 transition-all"
                            >
                                確認登出
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tier Benefits Modal ─────────────── */}
            {showTiers && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowTiers(false)}>
                    <div className="bg-white w-full max-w-[430px] rounded-t-[32px] p-6 pb-10 max-h-[80vh] overflow-y-auto nice-scrollbar" onClick={e => e.stopPropagation()}>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
                        <h2 className="text-[18px] font-black text-gray-900 mb-1">會員等級權益</h2>
                        <p className="text-[12px] text-gray-400 font-semibold mb-5">消費累積點數，自動升等，享受更多特權</p>
                        <div className="space-y-3">
                            {MEMBER_TIERS.map((t) => (
                                <div key={t.name} className={`p-4 rounded-[18px] border ${t.name === tier.name ? 'border-gray-400 bg-gray-50 ring-1 ring-gray-400' : 'border-gray-100 bg-gray-50'}`}>
                                    <div className="flex items-center gap-2.5 mb-2.5">
                                        <span className="text-2xl">{t.badge}</span>
                                        <div>
                                            <h3 className="font-black text-[15px] text-gray-900">{t.name}</h3>
                                            <p className="text-[11px] text-gray-400 font-bold">{t.min === 0 ? `0 – ${t.max} P` : t.max === Infinity ? `${t.min.toLocaleString()} P+` : `${t.min.toLocaleString()} – ${t.max.toLocaleString()} P`}</p>
                                        </div>
                                        {t.name === tier.name && <span className="ml-auto text-[10px] font-black bg-gray-900 text-white px-2 py-0.5 rounded-full">目前等級</span>}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {t.perks.map(perk => (
                                            <span key={perk} className="text-[11px] font-bold bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-lg">✓ {perk}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowTiers(false)} className="w-full mt-5 py-3 text-[14px] font-black text-gray-500 bg-gray-50 border border-gray-200 rounded-2xl">關閉</button>
                    </div>
                </div>
            )}
        </div>
    );
}
