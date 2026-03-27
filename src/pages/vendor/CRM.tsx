import { useState } from 'react';
import { Search, MapPin, Phone, MessageSquare, MoreVertical, Star, Tag, Plus, ChevronRight, TrendingUp, Clock } from 'lucide-react';

const CUSTOMERS = [
    {
        id: 'U001', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        car: 'BMW X5 (Black)', phone: '0912-345-678', totalSpend: 8400, visits: 7,
        lastVisit: '2026-03-01', tags: ['VIP', '鍍膜客'],
        history: [
            { date: '2026-03-01', service: '頂級陶瓷鍍膜保養', price: 2500 },
            { date: '2026-01-15', service: '尊榮內外雙重清潔', price: 800 },
            { date: '2025-12-10', service: '基礎快速洗車', price: 300 },
        ],
        note: '偏好下午時段，BMW X5 需特別注意側邊飾條',
        rating: 5.0,
    },
    {
        id: 'U002', name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
        car: 'Tesla Model 3 (White)', phone: '0923-456-789', totalSpend: 3200, visits: 4,
        lastVisit: '2026-02-15', tags: ['電動車'],
        history: [
            { date: '2026-02-15', service: '尊榮內外雙重清潔', price: 800 },
            { date: '2026-01-05', service: '基礎快速洗車', price: 300 },
        ],
        note: '',
        rating: 4.5,
    },
    {
        id: 'U003', name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
        car: 'Toyota Camry (Blue)', phone: '0934-567-890', totalSpend: 1800, visits: 3,
        lastVisit: '2026-02-28', tags: ['新客'],
        history: [
            { date: '2026-02-28', service: '基礎快速洗車', price: 300 },
        ],
        note: '',
        rating: 4.0,
    },
    {
        id: 'U004', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=b042581f4e29026704a',
        car: 'Ford F-150 (Silver)', phone: '0945-678-901', totalSpend: 5600, visits: 5,
        lastVisit: '2026-01-20', tags: ['大型車', '定期客'],
        history: [
            { date: '2026-01-20', service: '頂級陶瓷鍍膜保養', price: 2500 },
        ],
        note: '大型貨卡需要額外30分鐘',
        rating: 4.8,
    },
];

const TAG_COLORS: Record<string, string> = {
    'VIP': 'bg-amber-100 text-amber-700 border-amber-200',
    '鍍膜客': 'bg-blue-100 text-blue-700 border-blue-200',
    '電動車': 'bg-green-100 text-green-700 border-green-200',
    '新客': 'bg-purple-100 text-purple-700 border-purple-200',
    '大型車': 'bg-gray-100 text-gray-600 border-gray-200',
    '定期客': 'bg-brand-100 text-brand-700 border-brand-200',
};

export default function CRM() {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string | null>(null);

    const filtered = CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.car.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.includes(search))
    );

    const customer = CUSTOMERS.find(c => c.id === selected);

    if (customer) {
        return (
            <div className="min-h-screen bg-white text-gray-900 pb-24 font-sans">
                {/* Back header */}
                <div className="px-5 pt-12 pb-4 bg-white border-b border-gray-100 sticky top-0 z-30">
                    <button onClick={() => setSelected(null)} className="text-[13px] font-black text-brand-600 mb-3">← 返回客戶列表</button>
                    <div className="flex items-center gap-3">
                        <img src={customer.avatar} alt="" className="w-14 h-14 rounded-[14px] object-cover border border-gray-100" />
                        <div className="flex-1">
                            <h2 className="font-black text-[18px] text-gray-900">{customer.name}</h2>
                            <p className="text-[12px] text-gray-400 font-semibold">{customer.car}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500"><Phone size={15} /></button>
                            <button className="w-9 h-9 bg-brand-50 border border-brand-200 rounded-xl flex items-center justify-center text-brand-600"><MessageSquare size={15} /></button>
                        </div>
                    </div>
                </div>

                <div className="px-5 py-4 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: '總消費', value: `${(customer.totalSpend / 1000).toFixed(1)}K P` },
                            { label: '到訪次數', value: `${customer.visits} 次` },
                            { label: '綜合評分', value: `⭐ ${customer.rating}` },
                        ].map(item => (
                            <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-[14px] p-3 text-center">
                                <p className="text-[16px] font-black text-gray-900">{item.value}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="bg-white border border-gray-100 rounded-[18px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-[13px] font-black text-gray-700">客戶標籤</h3>
                            <button className="flex items-center gap-1 text-[11px] font-black text-brand-600"><Plus size={12} /> 新增</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {customer.tags.map(tag => (
                                <span key={tag} className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-white border border-gray-100 rounded-[18px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                        <h3 className="text-[13px] font-black text-gray-700 mb-2">備忘錄</h3>
                        <textarea
                            defaultValue={customer.note || '尚無備忘錄...'}
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[13px] text-gray-700 font-medium resize-none focus:outline-none focus:border-brand-400"
                        />
                    </div>

                    {/* Digital maintenance history */}
                    <div className="bg-white border border-gray-100 rounded-[18px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                        <h3 className="text-[13px] font-black text-gray-700 mb-3">數位保養履歷</h3>
                        <div className="space-y-2.5">
                            {customer.history.map((h, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-[12px]">
                                    <div className="w-10 h-10 bg-brand-50 border border-brand-100 rounded-xl flex items-center justify-center text-lg shrink-0">🔧</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-[13px] text-gray-900 truncate">{h.service}</p>
                                        <p className="text-[11px] text-gray-400 font-semibold">{h.date}</p>
                                    </div>
                                    <span className="font-black text-[13px] text-brand-600 shrink-0">{h.price} P</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 pb-24 font-sans">
            <div className="px-5 pt-12 pb-4 bg-white sticky top-0 z-30 border-b border-gray-100">
                <h1 className="text-[22px] font-black tracking-tight text-gray-900 mb-0.5">客戶資料庫</h1>
                <p className="text-[12px] text-gray-400 font-semibold mb-3">管理顧客關係與保養歷史記錄</p>
                {/* Summary */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                        { icon: <TrendingUp size={13} />, label: '總客戶', value: CUSTOMERS.length },
                        { icon: <Star size={13} />, label: 'VIP', value: CUSTOMERS.filter(c => c.tags.includes('VIP')).length },
                        { icon: <Clock size={13} />, label: '本月新客', value: 2 },
                    ].map(item => (
                        <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-[12px] p-2.5 flex items-center gap-2">
                            <span className="text-brand-500">{item.icon}</span>
                            <div>
                                <p className="text-[15px] font-black text-gray-900 leading-none">{item.value}</p>
                                <p className="text-[10px] text-gray-400 font-bold">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-brand-400 transition-all">
                    <Search size={15} className="text-gray-400 mr-2 shrink-0" />
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="搜尋客戶名稱、車牌或標籤..."
                        className="bg-transparent border-none outline-none w-full text-[13px] text-gray-900 placeholder-gray-400 font-medium" />
                </div>
            </div>

            <div className="px-5 pt-4 space-y-3">
                {filtered.map(c => (
                    <button key={c.id} onClick={() => setSelected(c.id)} className="w-full text-left bg-white border border-gray-100 rounded-[18px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] active:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                            <img src={c.avatar} alt="" className="w-12 h-12 rounded-[12px] object-cover border border-gray-100 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-black text-[15px] text-gray-900">{c.name}</h3>
                                    <span className="text-[12px] font-black text-brand-600">{c.totalSpend.toLocaleString()} P</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold mb-2">
                                    <MapPin size={10} /> {c.car} · 到訪 {c.visits} 次
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {c.tags.map(tag => (
                                        <span key={tag} className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                            <Tag size={8} className="inline mr-0.5" />{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 mt-1 shrink-0" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
