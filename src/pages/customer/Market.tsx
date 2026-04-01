import { ShoppingCart, Star, Package } from 'lucide-react';

const PRODUCTS = [
    { id: 1, name: '頂級棕櫚蠟', price: 120, rating: 4.8, image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&auto=format&fit=crop&q=80', stock: 15 },
    { id: 2, name: '超細纖維洗車巾 (5入組)', price: 45, rating: 4.9, image: 'https://images.unsplash.com/photo-1585501867160-b6f70912f277?w=500&auto=format&fit=crop&q=80', stock: 42 },
    { id: 3, name: '內裝皮革保養乳', price: 85, rating: 4.6, image: 'https://images.unsplash.com/photo-1552822765-b772223a4170?w=500&auto=format&fit=crop&q=80', stock: 8 },
    { id: 4, name: '陶瓷噴霧鍍膜 500ml', price: 250, rating: 4.9, image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500&auto=format&fit=crop&q=80', stock: 24 },
    { id: 5, name: '輪框與輪胎清潔劑', price: 65, rating: 4.7, image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=80', stock: 30 },
    { id: 6, name: '20L 專業洗車水桶', price: 35, rating: 4.5, image: 'https://images.unsplash.com/photo-1572205565319-3306db7c17b8?w=500&auto=format&fit=crop&q=80', stock: 12 },
];

export default function Market() {
    return (
        <div className="min-h-screen p-6 text-gray-900 bg-gray-50 pb-28">
            <div className="flex justify-between items-center mb-8 pt-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight mb-1 text-gray-900">點數商城</h1>
                    <p className="text-[13px] text-gray-500 font-medium">使用您的點數兌換頂級消費商品</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center justify-center w-10 h-10 bg-white shadow-sm rounded-full border border-gray-200 active:scale-95 transition-all">
                        <Package size={18} className="text-gray-600" />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full active:scale-95 shadow-lg relative">
                        <ShoppingCart size={18} />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-gray-900 rounded-full"></span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.map(prod => (
                    <div key={prod.id} className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-card active:scale-[0.98] transition-transform">
                        <div className="relative h-32 bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover rounded-[14px]" />
                            {prod.stock < 20 && (
                                <div className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-md text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                                    庫存緊張
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className="font-bold text-[14px] leading-tight text-gray-900 mb-1 truncate">{prod.name}</h3>
                            <div className="flex items-center gap-1 text-[11px] font-black text-gray-700 mb-3">
                                <Star size={12} className="text-amber-400 fill-amber-400" /> {prod.rating}
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="text-[15px] font-black text-gray-900">
                                    {prod.price} <span className="text-[10px] text-gray-400 font-bold">P</span>
                                </div>
                                <button className="p-1.5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg transition-colors text-gray-700">
                                    <ShoppingCart size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
