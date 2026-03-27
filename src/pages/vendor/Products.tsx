import { useState } from 'react';
import { Package, Plus, Edit2, Trash2, TrendingUp, ShoppingCart, Truck, Star } from 'lucide-react';

const INVENTORY = [
    { id: 1, name: '頂級棕櫚蠟', price: 120, sales: 84, stock: 15, image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=200&auto=format&fit=crop&q=80' },
    { id: 2, name: '超細纖維洗車巾 (5入組)', price: 45, sales: 212, stock: 42, image: 'https://images.unsplash.com/photo-1585501867160-b6f70912f277?w=200&auto=format&fit=crop&q=80' },
    { id: 3, name: '內裝皮革保養乳', price: 85, sales: 45, stock: 8, image: 'https://images.unsplash.com/photo-1552822765-b772223a4170?w=200&auto=format&fit=crop&q=80' },
    { id: 4, name: '20L 專業洗車水桶', price: 35, sales: 12, stock: 12, image: 'https://images.unsplash.com/photo-1572205565319-3306db7c17b8?w=200&auto=format&fit=crop&q=80' },
];

const B2B_PRODUCTS = [
    {
        id: 'b1', name: '5W-40 全合成機油 (4L x12)', unit: '箱', retail: 380, wholesale: 240, minOrder: 5, supplier: '台灣潤滑油', rating: 4.8, inStock: true,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop'
    },
    {
        id: 'b2', name: '陶瓷鍍膜保護液 Pro (500ml)', unit: '瓶', retail: 1200, wholesale: 780, minOrder: 3, supplier: 'NanoShield', rating: 5.0, inStock: true,
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=200&auto=format&fit=crop'
    },
    {
        id: 'b3', name: '雨刷精濃縮液 (1L x24)', unit: '箱', retail: 180, wholesale: 95, minOrder: 2, supplier: '速清科技', rating: 4.5, inStock: true,
        image: 'https://images.unsplash.com/photo-1587355760421-359f38e6f099?w=200&auto=format&fit=crop'
    },
    {
        id: 'b4', name: '輪胎光澤劑 (500ml x12)', unit: '箱', retail: 240, wholesale: 145, minOrder: 4, supplier: '光澤達人', rating: 4.3, inStock: false,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop'
    },
];

function StockBadge({ stock }: { stock: number }) {
    if (stock === 0) return <span className="badge-cancelled">缺貨</span>;
    if (stock < 10) return <span className="badge-pending">庫存低</span>;
    return <span className="badge-completed">庫存充足</span>;
}

export default function Products() {
    const [tab, setTab] = useState<'retail' | 'b2b'>('retail');
    const [cart, setCart] = useState<Record<string, number>>({});

    const addToCart = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

    return (
        <div className="text-gray-900 bg-white pb-24 font-sans">

            {/* Header */}
            <div className="px-5 pt-5 pt-2 pb-4 bg-white sticky top-0 z-30 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-[24px] font-black tracking-tight text-gray-900 mb-0.5">商品管理</h1>
                        <p className="text-[13px] text-gray-400 font-semibold">管理點數商城 | B2B 零配件批發</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {tab === 'b2b' && totalCartItems > 0 && (
                            <button className="relative flex items-center gap-1.5 px-3 py-2.5 bg-brand-600 text-white font-black text-[12px] rounded-xl shadow-blue-glow">
                                <ShoppingCart size={15} />
                                採購清單
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-[10px] font-black text-white flex items-center justify-center">{totalCartItems}</span>
                            </button>
                        )}
                        {tab === 'retail' && (
                            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 text-white font-black text-[13px] rounded-xl shadow-blue-glow active:scale-95 transition-all">
                                <Plus size={16} strokeWidth={2.5} /> 新增商品
                            </button>
                        )}
                    </div>
                </div>

                {/* Tab selector */}
                <div className="flex bg-gray-100 rounded-[14px] p-1">
                    <button onClick={() => setTab('retail')} className={`flex-1 py-2 text-[13px] font-black rounded-[10px] transition-all ${tab === 'retail' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
                        🛒 C端商城
                    </button>
                    <button onClick={() => setTab('b2b')} className={`flex-1 py-2 text-[13px] font-black rounded-[10px] transition-all ${tab === 'b2b' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500'}`}>
                        🏭 B2B 批發
                    </button>
                </div>
            </div>

            <div className="px-5 pt-4">

                {/* ── C-End Retail ─────────────────── */}
                {tab === 'retail' && (
                    <>
                        <div className="grid grid-cols-3 gap-2.5 mb-5">
                            {[
                                { label: '上架商品', value: INVENTORY.length },
                                { label: '總銷量', value: INVENTORY.reduce((a, p) => a + p.sales, 0) },
                                { label: '低庫存', value: INVENTORY.filter(p => p.stock < 10).length },
                            ].map(item => (
                                <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-[14px] p-3 text-center">
                                    <p className="text-[20px] font-black text-gray-900">{item.value}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{item.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            {INVENTORY.map(prod => (
                                <div key={prod.id} className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                                    <div className="flex gap-4 p-4">
                                        <div className="w-[72px] h-[72px] rounded-[13px] overflow-hidden shrink-0 border border-gray-100">
                                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1.5">
                                                <h3 className="font-black text-[14px] text-gray-900 leading-tight">{prod.name}</h3>
                                                <StockBadge stock={prod.stock} />
                                            </div>
                                            <div className="flex items-center gap-3 text-[12px] mb-2">
                                                <span className="font-black text-brand-600">{prod.price} <span className="font-bold text-gray-400">P</span></span>
                                                <span className="text-gray-300">|</span>
                                                <span className="text-gray-400 font-semibold">庫存 {prod.stock} 件</span>
                                                <span className="text-gray-300">|</span>
                                                <span className="flex items-center gap-0.5 text-gray-400 font-semibold"><TrendingUp size={11} className="text-green-500" /> {prod.sales}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] font-black text-gray-600 active:bg-gray-100 transition-colors"><Edit2 size={12} /> 編輯</button>
                                                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-100 rounded-lg text-[12px] font-black text-red-500 active:bg-red-100 transition-colors"><Trash2 size={12} /> 刪除</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[20px] flex flex-col items-center gap-2 text-gray-400 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-500 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 group-hover:border-brand-200 group-hover:bg-brand-50 flex items-center justify-center transition-all"><Plus size={20} strokeWidth={2.5} /></div>
                                <span className="text-[13px] font-black">新增商品</span>
                            </button>
                        </div>
                    </>
                )}

                {/* ── B2B Wholesale ─────────────────── */}
                {tab === 'b2b' && (
                    <>
                        <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-[18px] p-4 mb-4 text-white">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">門店專屬 B2B 批發商城</p>
                            <h2 className="text-[17px] font-black mb-0.5">以批發價直接進貨</h2>
                            <p className="text-[11px] text-blue-200 font-semibold">合作供應商 | 配送至門市 | 最低起訂量優惠</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {B2B_PRODUCTS.map(prod => {
                                const discount = Math.round((1 - prod.wholesale / prod.retail) * 100);
                                const qty = cart[prod.id] || 0;
                                return (
                                    <div key={prod.id} className={`bg-white border rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${!prod.inStock ? 'opacity-60' : 'border-gray-100'}`}>
                                        <div className="flex gap-3">
                                            <div className="w-16 h-16 rounded-[12px] overflow-hidden border border-gray-100 shrink-0">
                                                <img src={prod.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-1">
                                                    <h3 className="font-black text-[13px] text-gray-900 leading-tight pr-2">{prod.name}</h3>
                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${prod.inStock ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                                        {prod.inStock ? '現貨' : '缺貨'}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-semibold mb-1.5">供應商：{prod.supplier} · <span className="flex items-center gap-0.5 inline-flex"><Star size={9} className="fill-amber-400 text-amber-400" /> {prod.rating}</span></p>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-[16px] text-brand-600">${prod.wholesale}<span className="text-[11px] text-gray-400 font-bold">/{prod.unit}</span></span>
                                                    <span className="text-[11px] text-gray-400 line-through">${prod.retail}</span>
                                                    <span className="text-[10px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded">-{discount}%</span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">最低起訂 {prod.minOrder} {prod.unit}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            {qty > 0 ? (
                                                <div className="flex items-center gap-2 flex-1">
                                                    <button onClick={() => setCart(prev => ({ ...prev, [prod.id]: Math.max(0, qty - 1) }))}
                                                        className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-xl font-black text-gray-600 text-lg flex items-center justify-center">-</button>
                                                    <span className="font-black text-[15px] text-gray-900 flex-1 text-center">{qty}</span>
                                                    <button onClick={() => addToCart(prod.id)}
                                                        className="w-9 h-9 bg-brand-50 border border-brand-200 rounded-xl font-black text-brand-600 text-lg flex items-center justify-center">+</button>
                                                </div>
                                            ) : (
                                                <button onClick={() => prod.inStock && addToCart(prod.id)} disabled={!prod.inStock}
                                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-black transition-colors ${prod.inStock ? 'bg-brand-50 text-brand-700 border border-brand-200 active:bg-brand-100' : 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed'}`}>
                                                    <Truck size={14} /> 加入採購清單
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
