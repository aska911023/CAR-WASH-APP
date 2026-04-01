import { useState } from 'react';
import { DollarSign, TrendingUp, Users, CalendarCheck, Package, ArrowUpRight, ToggleLeft, ToggleRight, BookOpen } from 'lucide-react';

const SPARKLINE = [40, 65, 48, 72, 58, 85, 91];

export default function Dashboard() {
    const [dynamicPricing, setDynamicPricing] = useState(false);

    return (
        <div className="text-gray-900 bg-white p-5 pb-24 font-sans">

            {/* Header */}
            <div className="mb-6 pt-2">
                <h1 className="text-[24px] font-black tracking-tight mb-0.5 text-gray-900">店家儀表板</h1>
                <p className="text-[13px] text-gray-400 font-semibold">今日 · 2026年3月5日</p>
            </div>

            {/* Status Strip */}
            <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                    { label: '待確認', count: 3, cls: 'bg-amber-50 text-amber-700 border-amber-200' },
                    { label: '已接受', count: 5, cls: 'bg-gray-50 text-gray-700 border-gray-200' },
                    { label: '已完成', count: 12, cls: 'bg-green-50 text-green-700 border-green-200' },
                    { label: '已取消', count: 1, cls: 'bg-gray-100 text-gray-500 border-gray-200' },
                ].map(item => (
                    <div key={item.label} className={`flex flex-col items-center p-2.5 rounded-xl border ${item.cls}`}>
                        <span className="text-[20px] font-black leading-tight">{item.count}</span>
                        <span className="text-[10px] font-black mt-0.5">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                    { icon: DollarSign, label: '今日營收', value: '$1,240', trend: '+12.5%', trendColor: 'text-green-600 bg-green-50', iconColor: 'text-gray-600 bg-gray-100' },
                    { icon: CalendarCheck, label: '即將到來', value: '8', trend: '3 高優先', trendColor: 'text-gray-600 bg-gray-100', iconColor: 'text-gray-600 bg-gray-100' },
                    { icon: Package, label: '待處理訂單', value: '14', trend: '需要出貨', trendColor: 'text-amber-600 bg-amber-50', iconColor: 'text-gray-600 bg-gray-100' },
                    { icon: Users, label: '總客戶數', value: '1,492', trend: '+4% 本月', trendColor: 'text-green-600 bg-green-50', iconColor: 'text-gray-600 bg-gray-100' },
                ].map(({ icon: Icon, label, value, trend, trendColor, iconColor }) => (
                    <div key={label} className="bg-white border border-gray-100 rounded-[18px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${iconColor}`}><Icon size={18} /></div>
                        <p className="text-[11px] text-gray-400 font-bold mb-0.5 uppercase tracking-wide">{label}</p>
                        <h2 className="text-[26px] font-black text-gray-900 leading-none mb-2">{value}</h2>
                        <div className={`text-[11px] font-black w-fit px-2 py-0.5 rounded-md flex items-center gap-1 ${trendColor}`}>
                            {trend.startsWith('+') && <TrendingUp size={11} />}{trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Dynamic Pricing Toggle */}
            <div className="bg-white border border-gray-100 rounded-[20px] p-5 mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-[15px] font-black text-gray-900">離峰動態定價</h3>
                        <p className="text-[11px] text-gray-400 font-semibold mt-0.5">啟用後系統將自動在離峰時段顯示折扣標籤</p>
                    </div>
                    <button onClick={() => setDynamicPricing(!dynamicPricing)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-black border transition-all ${dynamicPricing ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                        {dynamicPricing ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        {dynamicPricing ? '已啟用' : '未啟用'}
                    </button>
                </div>
                {dynamicPricing && (
                    <div className="bg-gray-50 border border-gray-200 rounded-[14px] p-3 mt-3">
                        <p className="text-[12px] font-black text-gray-700 mb-2">離峰時段設定</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { time: '週一至週五 10:00–12:00', discount: '-15%', available: true },
                                { time: '週一至週三 14:00–16:00', discount: '-20%', available: true },
                            ].map((slot, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-[10px] p-2.5">
                                    <p className="text-[10px] font-bold text-gray-500 leading-tight">{slot.time}</p>
                                    <p className="text-[14px] font-black text-green-600 mt-1">{slot.discount}</p>
                                    <p className="text-[9px] text-green-500 font-bold">{slot.available ? '✓ 開放折扣' : '關閉'}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-2 text-[11px] font-black text-gray-700 py-1.5 border border-gray-200 rounded-lg bg-white">編輯時段設定</button>
                    </div>
                )}
            </div>

            {/* Digital History Stats */}
            <div className="bg-white border border-gray-100 rounded-[20px] p-5 mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-[15px] font-black text-gray-900 flex items-center gap-1.5"><BookOpen size={16} className="text-gray-500" /> 數位保養履歷</h3>
                        <p className="text-[11px] text-gray-400 font-semibold">累計寫入客戶車輛紀錄</p>
                    </div>
                    <button className="text-gray-600 font-black text-[12px] flex items-center gap-0.5">查看全部 <ArrowUpRight size={14} /></button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: '總履歷數', value: '284', color: 'text-gray-900' },
                        { label: '本月新增', value: '38', color: 'text-green-600' },
                        { label: '覆蓋客戶', value: '156', color: 'text-gray-900' },
                    ].map(item => (
                        <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-[14px] p-3 text-center">
                            <p className={`text-[22px] font-black ${item.color}`}>{item.value}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Revenue Sparkline */}
            <div className="bg-white border border-gray-100 rounded-[20px] p-5 mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-[15px] font-black text-gray-900">本週營收趨勢</h3>
                        <p className="text-[11px] text-gray-400 font-semibold">近 7 天</p>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                        <TrendingUp size={13} /> +18.2%
                    </div>
                </div>
                <div className="flex items-end gap-1.5 h-[60px]">
                    {SPARKLINE.map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className={`w-full rounded-t-md transition-all ${i === SPARKLINE.length - 1 ? 'bg-gray-900' : 'bg-gray-300'}`} style={{ height: `${h}%` }} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-1.5">
                    {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                        <span key={d} className="flex-1 text-center text-[10px] text-gray-400 font-bold">{d}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
