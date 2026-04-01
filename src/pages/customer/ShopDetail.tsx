import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const SERVICES = [
    { id: '1', name: '基礎快速洗車', price: 300, points: 300, duration: '約 30 分鐘', desc: '車籍外觀泡沫洗車、輪框清潔與基礎輪胎油保養。' },
    { id: '2', name: '尊榮內外雙重清潔', price: 800, points: 800, duration: '約 90 分鐘', desc: '全車深入洗淨，加上車內地毯吸塵、皮椅擦拭。' },
    { id: '3', name: '頂級陶瓷鍍膜保養', price: 2500, points: 2500, duration: '約 4 小時', desc: '漆面矯正、跑磁土除鐵粉，並施加高階鍍膜保護層。' }
];

export default function ShopDetail() {
    useParams();
    const { state, deductPoints } = useAppContext();
    const [selectedService, setSelectedService] = useState(SERVICES[0]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleBook = () => {
        if (!date || !time) {
            setErrorMsg('請先選擇預約的日期與時間。');
            return;
        }

        const success = deductPoints(selectedService.points);
        if (success) {
            setBookingSuccess(true);
            setErrorMsg('');
        } else {
            setErrorMsg('您的點數不足！請先儲值錢包。');
        }
    };

    if (bookingSuccess) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center min-h-screen text-center p-8 bg-gray-50 pb-24">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5 shadow-sm border border-green-200">
                    <ShieldCheck size={40} />
                </div>
                <h2 className="text-3xl font-black mb-3 text-gray-900 tracking-tight">預約成功！</h2>
                <p className="text-[14px] text-gray-500 font-medium max-w-xs mb-8 leading-relaxed">
                    您已預約 {date} {time} 的「{selectedService.name}」。共扣除 {selectedService.points} 點。
                </p>
                <Link to="/profile" className="w-full py-4 bg-gray-900 active:bg-gray-800 text-white rounded-xl transition-all shadow-lg font-bold">
                    檢視我的訂單
                </Link>
            </div>
        );
    }

    return (
        <div className="text-gray-900 bg-gray-50 pb-28 min-h-screen">
            <div className="h-60 w-full relative">
                <Link to="/shops" className="absolute top-6 left-6 z-10 bg-white/90 p-2.5 rounded-full shadow-md active:scale-95 transition-all backdrop-blur-md">
                    <ChevronLeft size={20} className="text-gray-900" />
                </Link>
                <img src="https://images.unsplash.com/photo-1520340356584-f9917d1e511c?auto=format&fit=crop&q=80&w=1600" alt="Shop Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
            </div>

            <div className="px-5 -mt-10 relative z-10">
                <div className="flex flex-col gap-6">

                    {/* Shop Info block */}
                    <div className="bg-white rounded-[24px] p-6 shadow-card border border-gray-100">
                        <h1 className="text-2xl font-black mb-2 text-gray-900 leading-tight">Elite Auto Spa</h1>
                        <div className="flex flex-col gap-2 text-[13px] font-bold mb-4">
                            <span className="flex w-fit items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                                <Star size={14} className="fill-amber-400" /> 4.9 (128 則評價)
                            </span>
                            <span className="flex w-fit items-center gap-1.5 text-gray-500">
                                <MapPin size={14} className="text-gray-400" /> 123 Wash Street, Downtown
                            </span>
                        </div>

                        <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                            體驗極致汽車護理。我們專業的汽車美容團隊使用最先進的設備，以及頂級環保洗劑，為您恢復並保護愛車最完美的狀態。
                        </p>
                    </div>

                    {/* Services block */}
                    <div>
                        <h3 className="text-[18px] font-black tracking-tight mb-4 px-1 text-gray-900">選擇服務項目</h3>
                        <div className="space-y-3">
                            {SERVICES.map(srv => (
                                <div
                                    key={srv.id}
                                    onClick={() => setSelectedService(srv)}
                                    className={`p-4 rounded-[20px] cursor-pointer transition-all active:scale-[0.98] border ${selectedService.id === srv.id ? 'border-gray-900 bg-gray-50 shadow-md' : 'border-gray-100 bg-white shadow-sm'}`}
                                >
                                    <div className="flex justify-between items-start mb-1.5">
                                        <h4 className="font-bold text-[15px] text-gray-900">{srv.name}</h4>
                                        <span className={`font-black ${selectedService.id === srv.id ? 'text-gray-900' : 'text-gray-700'}`}>{srv.points} P</span>
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium mb-3 leading-relaxed">{srv.desc}</p>
                                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold bg-gray-100 w-fit px-2 py-1 rounded-md">
                                        <Clock size={12} /> 約 {srv.duration}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Flow */}
                    <div className="bg-white border border-gray-100 shadow-card rounded-[24px] p-6 mb-8 mt-2">
                        <h3 className="text-[17px] font-black mb-5 text-gray-900">選擇預約時段</h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">日期</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm appearance-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">時間</label>
                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm appearance-none"
                                >
                                    <option value="" disabled>請選擇時段</option>
                                    <option value="10:00 AM">上午 10:00</option>
                                    <option value="01:00 PM">下午 01:00</option>
                                    <option value="04:00 PM">下午 04:00</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-5 space-y-2">
                            <div className="flex justify-between text-gray-500 text-[13px] font-bold">
                                <span>小計</span>
                                <span>{selectedService.points} P</span>
                            </div>
                            <div className="flex justify-between font-black text-lg py-1">
                                <span>本次需支付</span>
                                <span className="text-gray-900">{selectedService.points} 點</span>
                            </div>
                            <div className="flex justify-between text-[13px] mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-gray-500 font-bold">目前點數餘額：</span>
                                <span className={state.points < selectedService.points ? 'text-red-500 font-black' : 'text-gray-900 font-black'}>
                                    {state.points} P
                                </span>
                            </div>
                        </div>

                        {errorMsg && <div className="text-red-500 text-[13px] font-bold mb-4 p-3 bg-red-50 rounded-xl border border-red-100">{errorMsg}</div>}

                        <button
                            onClick={handleBook}
                            className="w-full py-4 bg-gray-900 active:bg-gray-800 text-white font-bold rounded-[16px] transition-all shadow-lg disabled:opacity-50 disabled:bg-gray-300 disabled:shadow-none mt-2"
                            disabled={state.points < selectedService.points}
                        >
                            確認預約
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
