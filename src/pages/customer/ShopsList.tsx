import { useState, useEffect } from 'react';
import { Filter, Star, MapPin, List, Map as MapIcon, X, SlidersHorizontal, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

export const ALL_SERVICE_TAGS = ['快洗', '精緻洗車', '機器打蠟', '內裝美容', '陶瓷鍍膜', '除油膜', '道路救援', '汽車百貨'];

const MOCK_SHOPS = [
    { id: 'shop-0', name: 'Elite Auto Spa', rating: 4.9, reviews: 312, location: 'Downtown', distance: '0.8 km', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1e511c?auto=format&fit=crop&q=80&w=800', mapX: 20, mapY: 30, services: ['精緻洗車', '陶瓷鍍膜', '除油膜'] },
    { id: 'shop-1', name: 'QuickWash Express', rating: 4.6, reviews: 185, location: 'Westside', distance: '1.2 km', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800', mapX: 65, mapY: 55, services: ['快洗', '除油膜'] },
    { id: 'shop-2', name: 'Eco Shine Detailers', rating: 4.7, reviews: 98, location: 'North District', distance: '1.8 km', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800', mapX: 40, mapY: 70, services: ['機器打蠟', '精緻洗車', '內裝美容'] },
    { id: 'shop-3', name: 'Glow & Go Wash', rating: 4.5, reviews: 204, location: 'South End', distance: '2.4 km', image: 'https://images.unsplash.com/photo-1587560699334-bea4cb2b542e?auto=format&fit=crop&q=80&w=800', mapX: 75, mapY: 35, services: ['快洗', '汽車百貨'] },
    { id: 'shop-4', name: 'Supreme Car Care', rating: 4.8, reviews: 411, location: 'East Bay', distance: '3.1 km', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800', mapX: 30, mapY: 55, services: ['陶瓷鍍膜', '機器打蠟', '道路救援'] },
    { id: 'shop-5', name: 'Detailing Wizards', rating: 4.6, reviews: 133, location: 'Central', distance: '3.9 km', image: 'https://images.unsplash.com/photo-1552822765-b772223a4170?auto=format&fit=crop&q=80&w=800', mapX: 55, mapY: 20, services: ['內裝美容', '除油膜', '機器打蠟'] },
];

const SORT_OPTIONS = ['距離最近', '評分最高', '評論最多'];

export default function ShopsList() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialService = searchParams.get('service') || '';

    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [selectedPin, setSelectedPin] = useState<number | null>(null);
    const [activeServices, setActiveServices] = useState<string[]>(initialService ? [initialService] : []);
    const [sortBy, setSortBy] = useState('距離最近');
    const [showFilter, setShowFilter] = useState(false);
    const [draftServices, setDraftServices] = useState<string[]>(activeServices);
    const [draftSort, setDraftSort] = useState(sortBy);

    useEffect(() => {
        if (initialService) setActiveServices([initialService]);
    }, [initialService]);

    const openFilter = () => {
        setDraftServices(activeServices);
        setDraftSort(sortBy);
        setShowFilter(true);
    };

    const applyFilter = () => {
        setActiveServices(draftServices);
        setSortBy(draftSort);
        setShowFilter(false);
    };

    const resetFilter = () => {
        setDraftServices([]);
        setDraftSort('距離最近');
    };

    const toggleDraftService = (s: string) => {
        setDraftServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    };

    const filteredShops = MOCK_SHOPS
        .filter(shop => activeServices.length === 0 || activeServices.some(s => shop.services.includes(s)))
        .sort((a, b) => {
            if (sortBy === '評分最高') return Number(b.rating) - Number(a.rating);
            if (sortBy === '評論最多') return b.reviews - a.reviews;
            return parseFloat(a.distance) - parseFloat(b.distance);
        });

    const activeCount = activeServices.length + (sortBy !== '距離最近' ? 1 : 0);

    return (
        <div className="min-h-screen text-gray-900 bg-gray-50 pb-28 relative">

            {/* ── Header ─────────────────────────────── */}
            <div className="px-5 pt-10 pb-3 sticky top-0 z-30 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 active:scale-95 transition-all shrink-0"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <h1 className="text-[22px] font-black tracking-tight text-gray-900">尋找洗車店家</h1>
                            <p className="text-[12px] font-semibold mt-0.5 text-gray-400">
                                顯示 {filteredShops.length} / {MOCK_SHOPS.length} 間門店
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openFilter}
                        className={`flex items-center gap-1.5 px-3 py-2 bg-white shadow-card border rounded-xl active:scale-95 transition-all text-[13px] font-bold relative ${activeCount > 0 ? 'border-gray-900 text-gray-900' : 'border-gray-200 text-gray-700'}`}
                    >
                        <SlidersHorizontal size={15} /> 篩選
                        {activeCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-black flex items-center justify-center bg-gray-900">
                                {activeCount}
                            </span>
                        )}
                    </button>
                </div>

                {activeServices.length > 0 && (
                    <div className="flex gap-1.5 overflow-x-auto nice-scrollbar pb-1">
                        {activeServices.map(s => (
                            <button key={s}
                                onClick={() => setActiveServices(prev => prev.filter(x => x !== s))}
                                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black text-white bg-gray-900">
                                {s} <X size={10} />
                            </button>
                        ))}
                        <button onClick={() => setActiveServices([])} className="shrink-0 text-[11px] font-bold text-gray-400 px-1">
                            清除全部
                        </button>
                    </div>
                )}
            </div>

            {/* ── List Mode ──────────────────────────── */}
            {viewMode === 'list' && (
                <div className="px-5 flex flex-col gap-3">
                    {filteredShops.length === 0 ? (
                        <div className="flex flex-col items-center py-16 text-gray-400">
                            <span className="text-5xl mb-3">🔍</span>
                            <p className="font-black text-[15px]">找不到符合的店家</p>
                            <p className="text-[12px] mt-1">請嘗試調整篩選條件</p>
                            <button onClick={() => setActiveServices([])} className="mt-4 px-4 py-2 rounded-xl font-black text-[13px] text-white bg-gray-900">清除篩選</button>
                        </div>
                    ) : (
                        filteredShops.map((shop) => (
                            <Link key={shop.id} to={`/shops/${shop.id}`}
                                className="flex gap-3 bg-white p-3 rounded-[20px] shadow-card border border-gray-100 active:scale-[0.98] transition-all">
                                <div className="w-[90px] h-[90px] shrink-0 rounded-[14px] overflow-hidden">
                                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-0.5 pr-1 min-w-0">
                                    <div>
                                        <h3 className="text-[15px] font-black text-gray-900 leading-tight truncate mb-0.5">{shop.name}</h3>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold mb-2">
                                            <MapPin size={11} className="text-gray-400" /> {shop.distance} · {shop.location}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {shop.services.map((s) => (
                                                <span key={s}
                                                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md border transition-all ${activeServices.includes(s) ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1 text-[13px] font-black text-gray-800">
                                            <Star size={13} className="text-amber-400 fill-amber-400" /> {shop.rating}
                                            <span className="text-[11px] font-medium text-gray-400 ml-1">({shop.reviews})</span>
                                        </div>
                                        <span className="text-[12px] font-black text-white px-3 py-1.5 rounded-xl shadow-sm bg-gray-900">預約</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}

            {/* ── Map Mode ───────────────────────────── */}
            {viewMode === 'map' && (
                <div className="px-5">
                    <div className="relative w-full h-[460px] rounded-[24px] overflow-hidden shadow-lg border border-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
                            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                                <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9ca3af" strokeWidth="0.5" /></pattern></defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/60 -translate-y-8" />
                            <div className="absolute top-1/3 left-0 right-0 h-[1.5px] bg-white/40" />
                            <div className="absolute top-0 bottom-0 left-1/3 w-[1.5px] bg-white/40" />
                            <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-white/60" />
                        </div>

                        {filteredShops.map((shop, i) => (
                            <button key={shop.id} onClick={() => setSelectedPin(selectedPin === i ? null : i)}
                                className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-full transition-all duration-200"
                                style={{ left: `${shop.mapX}%`, top: `${shop.mapY}%` }}>
                                <div className={`px-2.5 py-1 rounded-xl text-[11px] font-black shadow-lg border-2 transition-all ${selectedPin === i
                                    ? 'bg-gray-900 text-white border-white scale-110'
                                    : 'bg-white text-gray-700 border-gray-200'}`}>
                                    ⭐ {shop.rating}
                                </div>
                                <div className={`w-2 h-2 rounded-full ${selectedPin === i ? 'bg-gray-900' : 'bg-gray-400'}`} />
                            </button>
                        ))}

                        {selectedPin !== null && filteredShops[selectedPin] && (
                            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-200 animate-in">
                                <button onClick={() => setSelectedPin(null)} className="absolute top-3 right-3 text-gray-400"><X size={16} /></button>
                                <div className="flex gap-3">
                                    <img src={filteredShops[selectedPin].image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-black text-[15px] text-gray-900 truncate">{filteredShops[selectedPin].name}</h4>
                                        <p className="text-[11px] text-gray-400 font-semibold">{filteredShops[selectedPin].distance} · {filteredShops[selectedPin].location}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star size={12} className="fill-amber-400 text-amber-400" />
                                            <span className="text-[12px] font-black">{filteredShops[selectedPin].rating}</span>
                                        </div>
                                    </div>
                                    <Link to={`/shops/${filteredShops[selectedPin].id}`} className="self-center text-[12px] font-black text-white px-3 py-2 rounded-xl shadow-sm shrink-0 bg-gray-900">
                                        預約
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 bg-gray-900 rounded-full border-2 border-white shadow-lg" />
                            <div className="absolute inset-0 w-4 h-4 bg-gray-500 rounded-full animate-ping opacity-60" />
                        </div>
                    </div>
                </div>
            )}

            {/* ── FAB ─────────────────────────────────── */}
            <button onClick={() => setViewMode(v => v === 'list' ? 'map' : 'list')} className="fab" aria-label="切換地圖/列表">
                {viewMode === 'list' ? <MapIcon size={24} strokeWidth={2.5} /> : <List size={24} strokeWidth={2.5} />}
            </button>

            {/* ══ Filter Bottom Sheet ════════════════════ */}
            {showFilter && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.5)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowFilter(false); }}>
                    <div className="bg-white rounded-t-[28px] w-full max-w-[430px] mx-auto" style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>

                        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
                            <button onClick={resetFilter} className="text-[13px] font-black text-red-500">重置</button>
                            <h2 className="text-[15px] font-black text-gray-900 flex items-center gap-2"><Filter size={15} /> 篩選條件</h2>
                            <button onClick={() => setShowFilter(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                            <div>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5">排序方式</p>
                                <div className="flex gap-2 flex-wrap">
                                    {SORT_OPTIONS.map(opt => (
                                        <button key={opt} onClick={() => setDraftSort(opt)}
                                            className={`px-3.5 py-2 rounded-xl text-[12px] font-black border transition-all ${draftSort === opt ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5">服務類型（可多選）</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {ALL_SERVICE_TAGS.map(tag => {
                                        const active = draftServices.includes(tag);
                                        return (
                                            <button key={tag} onClick={() => toggleDraftService(tag)}
                                                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-[14px] border text-[13px] font-bold transition-all ${active ? 'bg-gray-50 text-gray-900 border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                                {active && <CheckCircle2 size={14} className="text-gray-900" />}
                                                {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="px-5 pb-6 pt-3 border-t border-gray-100 shrink-0">
                            <button onClick={applyFilter}
                                className="w-full py-3.5 rounded-2xl font-black text-[14px] text-white active:scale-95 transition-all bg-gray-900 shadow-lg">
                                套用篩選 {draftServices.length > 0 ? `(${draftServices.length} 項服務)` : ''}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
