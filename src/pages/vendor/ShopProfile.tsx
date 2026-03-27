import { useState } from 'react';
import { Camera, Save, Plus, Star, MapPin } from 'lucide-react';
import { ALL_SERVICE_TAGS } from '../customer/ShopsList';

export default function ShopProfile() {
    const [selectedTags, setSelectedTags] = useState<string[]>(['精緻洗車', '陶瓷鍍膜', '除油膜']);
    const toggleTag = (t: string) => setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

    return (
        <div className="text-gray-900 bg-white p-5 pb-24 font-sans">

            {/* ── Header ─────────────────────────────── */}
            <div className="flex justify-between items-start mb-5 pt-2">
                <div>
                    <h1 className="text-[24px] font-black tracking-tight text-gray-900 mb-0.5">店家主頁設定</h1>
                    <p className="text-[13px] text-gray-400 font-semibold">管理您的公開資訊與服務項目</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 text-white font-black text-[13px] rounded-xl shadow-blue-glow active:scale-95 transition-all">
                    <Save size={15} strokeWidth={2.5} /> 儲存
                </button>
            </div>

            {/* ── Preview Card ─────────────────────── */}
            <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-4 mb-5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">公開預覽</p>
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-[14px] overflow-hidden border border-gray-200 shrink-0">
                        <img src="https://images.unsplash.com/photo-1520340356584-f9917d1e511c?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="cover" />
                    </div>
                    <div>
                        <h2 className="font-black text-[16px] text-gray-900">Elite Auto Spa</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-0.5 text-[12px] text-amber-500 font-black"><Star size={11} className="fill-amber-400 text-amber-400" /> 4.9</span>
                            <span className="text-gray-300">·</span>
                            <span className="flex items-center gap-0.5 text-[12px] text-gray-400 font-semibold"><MapPin size={11} className="text-gray-300" /> Downtown</span>
                        </div>
                    </div>
                    <span className="ml-auto text-[11px] font-black px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg">上架中</span>
                </div>
            </div>

            <div className="space-y-4">
                {/* ── Basic Info ─────────────────────── */}
                <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <h3 className="text-[14px] font-black text-gray-700 mb-4 pb-2 border-b border-gray-100">基本資料</h3>

                    {/* Cover photo */}
                    <div className="relative h-36 bg-gray-100 rounded-[14px] mb-4 overflow-hidden border border-gray-200 group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1520340356584-f9917d1e511c?auto=format&fit=crop&q=80&w=800" alt="cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 font-black text-[13px] text-gray-700 shadow-lg">
                                <Camera size={16} className="text-brand-600" /> 更換封面
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: '店家名稱', value: 'Elite Auto Spa', type: 'text' },
                            { label: '地址', value: '123 Wash Street, Downtown', type: 'text' },
                            { label: '電話', value: '02-1234-5678', type: 'tel' },
                        ].map(field => (
                            <div key={field.label}>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    defaultValue={field.value}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">店家介紹</label>
                            <textarea
                                rows={3}
                                defaultValue="體驗極致的汽車護理。我們專業的汽車美容團隊使用最先進的設備..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Service Tags ─────────────── */}
                <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <h3 className="text-[14px] font-black text-gray-700 mb-1 pb-2 border-b border-gray-100">服務標籤</h3>
                    <p className="text-[11px] text-gray-400 font-medium mb-3">勾選您提供的服務類型，顧客可在搜尋頁快速筛選</p>
                    <div className="grid grid-cols-2 gap-2">
                        {ALL_SERVICE_TAGS.map(tag => {
                            const active = selectedTags.includes(tag);
                            return (
                                <button key={tag} onClick={() => toggleTag(tag)}
                                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-[14px] border text-[13px] font-bold transition-all text-left"
                                    style={active
                                        ? { background: '#eff6ff', color: '#1d4ed8', borderColor: '#2563eb' }
                                        : { background: '#f8fafc', color: '#6b7280', borderColor: '#e5e7eb' }}>
                                    <span className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all"
                                        style={active ? { background: '#2563eb' } : { background: '#e5e7eb' }}>
                                        {active && <span className="text-white text-[10px] font-black">✓</span>}
                                    </span>
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-3 text-[11px] font-bold" style={{ color: '#2563eb' }}>已選 {selectedTags.length} 個標籤</p>
                </div>

                {/* ── Services ──────────────────────── */}
                <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
                        <h3 className="text-[14px] font-black text-gray-700">服務與價格設定</h3>
                        <button className="flex items-center gap-1 text-[12px] font-black text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg active:bg-brand-100 transition-colors">
                            <Plus size={13} strokeWidth={2.5} /> 新增
                        </button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: '基礎快速洗車', points: 300, duration: '約 30 分鐘' },
                            { name: '尊榮內外雙重清潔', points: 800, duration: '約 90 分鐘' },
                            { name: '頂級陶瓷鍍膜保養', points: 2500, duration: '約 4 小時' },
                        ].map((srv, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-[14px]">
                                <div className="flex-1 min-w-0">
                                    <input
                                        type="text"
                                        defaultValue={srv.name}
                                        className="w-full bg-transparent font-black text-[14px] text-gray-900 focus:outline-none focus:text-brand-600 transition-colors mb-0.5"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={srv.duration}
                                        className="text-[12px] font-semibold text-gray-400 bg-transparent focus:outline-none w-full"
                                    />
                                </div>
                                <div className="flex items-center border border-gray-200 bg-white rounded-xl px-3 py-2 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/15 transition-all shadow-sm shrink-0">
                                    <input type="number" defaultValue={srv.points} className="w-16 bg-transparent text-gray-900 font-black text-right text-[14px] focus:outline-none" />
                                    <span className="text-gray-400 font-bold text-[11px] ml-1.5">P</span>
                                </div>
                                <button className="text-[12px] font-black text-red-400 border border-red-100 bg-red-50 px-2.5 py-2 rounded-xl active:bg-red-100 transition-colors shrink-0">
                                    移除
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
