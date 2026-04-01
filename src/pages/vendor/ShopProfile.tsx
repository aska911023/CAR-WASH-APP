import { useState } from 'react';
import { Camera, Save, Plus, Star, MapPin, Calendar, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ALL_SERVICE_TAGS } from '../customer/ShopsList';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const WEEKDAY_FULL = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

// Generate calendar days for a given month
function getCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
}

// Mock schedule data
const INITIAL_SCHEDULE: Record<number, { open: boolean; start: string; end: string; slots: number }> = {
    0: { open: false, start: '09:00', end: '18:00', slots: 3 },
    1: { open: true, start: '09:00', end: '18:00', slots: 4 },
    2: { open: true, start: '09:00', end: '18:00', slots: 4 },
    3: { open: true, start: '09:00', end: '18:00', slots: 4 },
    4: { open: true, start: '09:00', end: '18:00', slots: 4 },
    5: { open: true, start: '09:00', end: '18:00', slots: 4 },
    6: { open: true, start: '10:00', end: '16:00', slots: 3 },
};

// Mock blocked dates
const INITIAL_BLOCKED = ['2026-04-05', '2026-04-06'];

// Mock existing bookings
const MOCK_BOOKINGS: Record<string, { time: string; customer: string; service: string }[]> = {
    '2026-04-02': [
        { time: '10:00', customer: 'John Doe', service: '基礎快速洗車' },
        { time: '14:00', customer: 'Sarah Smith', service: '頂級陶瓷鍍膜保養' },
    ],
    '2026-04-03': [
        { time: '09:00', customer: 'Emily Chen', service: '尊榮內外雙重清潔' },
        { time: '11:00', customer: 'Mike Johnson', service: '基礎快速洗車' },
        { time: '15:00', customer: 'Alex Rodriguez', service: '機器打蠟' },
    ],
    '2026-04-07': [
        { time: '10:00', customer: 'Lisa Wang', service: '基礎快速洗車' },
    ],
};

export default function ShopProfile() {
    const [selectedTags, setSelectedTags] = useState<string[]>(['精緻洗車', '陶瓷鍍膜', '除油膜']);
    const toggleTag = (t: string) => setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

    // Calendar state
    const today = new Date();
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
    const [blockedDates, setBlockedDates] = useState<string[]>(INITIAL_BLOCKED);
    const [showScheduleEditor, setShowScheduleEditor] = useState(false);

    const calDays = getCalendarDays(calYear, calMonth);
    const monthLabel = `${calYear} 年 ${calMonth + 1} 月`;

    const prevMonth = () => {
        if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
        else setCalMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
        else setCalMonth(m => m + 1);
    };

    const formatDateStr = (day: number) => {
        const m = String(calMonth + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${calYear}-${m}-${d}`;
    };

    const toggleBlockDate = (dateStr: string) => {
        setBlockedDates(prev => prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]);
    };

    const toggleDayOpen = (dayIdx: number) => {
        setSchedule(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], open: !prev[dayIdx].open } }));
    };

    const updateSchedule = (dayIdx: number, field: 'start' | 'end' | 'slots', value: string | number) => {
        setSchedule(prev => ({ ...prev, [dayIdx]: { ...prev[dayIdx], [field]: value } }));
    };

    const selectedBookings = selectedDate ? (MOCK_BOOKINGS[selectedDate] || []) : [];
    const isBlocked = selectedDate ? blockedDates.includes(selectedDate) : false;

    return (
        <div className="text-gray-900 bg-white p-5 pb-24 font-sans">

            {/* ── Header ─────────────────────────────── */}
            <div className="flex justify-between items-start mb-5 pt-2">
                <div>
                    <h1 className="text-[24px] font-black tracking-tight text-gray-900 mb-0.5">店家主頁設定</h1>
                    <p className="text-[13px] text-gray-400 font-semibold">管理您的公開資訊、服務項目與預約時間</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 text-white font-black text-[13px] rounded-xl shadow-lg active:scale-95 transition-all">
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

                {/* ══ Calendar & Schedule Section ══════════════════════ */}
                <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
                        <h3 className="text-[14px] font-black text-gray-700 flex items-center gap-1.5"><Calendar size={15} /> 行事曆</h3>
                        <button
                            onClick={() => setShowScheduleEditor(!showScheduleEditor)}
                            className="flex items-center gap-1 text-[12px] font-black text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg active:bg-gray-100 transition-colors"
                        >
                            <Clock size={13} /> 營業時間設定
                        </button>
                    </div>

                    {/* Calendar Navigation */}
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-gray-600 active:bg-gray-100">
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-[14px] font-black text-gray-900">{monthLabel}</span>
                        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-gray-600 active:bg-gray-100">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 gap-1 mb-1">
                        {WEEKDAYS.map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-gray-400 py-1">{d}</div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 mb-3">
                        {calDays.map((day, i) => {
                            if (day === null) return <div key={`e-${i}`} />;
                            const dateStr = formatDateStr(day);
                            const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                            const isSelected = selectedDate === dateStr;
                            const blocked = blockedDates.includes(dateStr);
                            const hasBookings = MOCK_BOOKINGS[dateStr] && MOCK_BOOKINGS[dateStr].length > 0;
                            const dayOfWeek = new Date(calYear, calMonth, day).getDay();
                            const isClosed = !schedule[dayOfWeek]?.open;

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                                    className={`relative aspect-square flex flex-col items-center justify-center rounded-[10px] text-[13px] font-bold transition-all
                                        ${isSelected ? 'bg-gray-900 text-white' : ''}
                                        ${!isSelected && isToday ? 'bg-gray-100 text-gray-900 font-black' : ''}
                                        ${!isSelected && !isToday && blocked ? 'bg-red-50 text-red-400 line-through' : ''}
                                        ${!isSelected && !isToday && isClosed && !blocked ? 'text-gray-300' : ''}
                                        ${!isSelected && !isToday && !blocked && !isClosed ? 'text-gray-700 hover:bg-gray-50' : ''}
                                    `}
                                >
                                    {day}
                                    {hasBookings && !isSelected && (
                                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gray-900" />
                                    )}
                                    {hasBookings && isSelected && (
                                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mb-3 px-1">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-900" /> 有預約</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-300" /> 已封鎖</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-200" /> 休息日</span>
                    </div>

                    {/* Selected date detail */}
                    {selectedDate && (
                        <div className="bg-gray-50 border border-gray-200 rounded-[14px] p-3 animate-in">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[13px] font-black text-gray-900">{selectedDate}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleBlockDate(selectedDate)}
                                        className={`text-[11px] font-black px-2.5 py-1 rounded-lg border transition-all ${isBlocked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                                    >
                                        {isBlocked ? '解除封鎖' : '封鎖此日'}
                                    </button>
                                </div>
                            </div>

                            {isBlocked ? (
                                <p className="text-[12px] text-red-500 font-semibold">此日期已封鎖，不接受預約</p>
                            ) : selectedBookings.length > 0 ? (
                                <div className="space-y-2">
                                    <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">已預約 ({selectedBookings.length})</p>
                                    {selectedBookings.map((b, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-[10px] p-2.5">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[11px] font-black text-gray-700">{b.time}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[12px] font-black text-gray-900 truncate">{b.customer}</p>
                                                <p className="text-[10px] text-gray-400 font-semibold">{b.service}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[12px] text-gray-400 font-semibold">尚無預約</p>
                            )}
                        </div>
                    )}
                </div>

                {/* ══ Schedule Editor (Booking Time Settings) ══════════ */}
                {showScheduleEditor && (
                    <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] animate-in">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
                            <h3 className="text-[14px] font-black text-gray-700 flex items-center gap-1.5"><Clock size={15} /> 可預約時間設定</h3>
                            <button onClick={() => setShowScheduleEditor(false)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                                <X size={14} />
                            </button>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium mb-4">設定每日營業時間與可接預約數，顧客僅能在開放時段預約</p>

                        <div className="space-y-2.5">
                            {[0, 1, 2, 3, 4, 5, 6].map(dayIdx => {
                                const day = schedule[dayIdx];
                                return (
                                    <div key={dayIdx} className={`flex items-center gap-3 p-3 rounded-[12px] border transition-all ${day.open ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'}`}>
                                        {/* Toggle */}
                                        <button
                                            onClick={() => toggleDayOpen(dayIdx)}
                                            className={`w-10 h-6 rounded-full relative transition-all ${day.open ? 'bg-gray-900' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${day.open ? 'left-5' : 'left-1'}`} />
                                        </button>

                                        {/* Day label */}
                                        <span className={`text-[13px] font-black w-14 shrink-0 ${day.open ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {WEEKDAY_FULL[dayIdx]}
                                        </span>

                                        {day.open ? (
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <input
                                                    type="time"
                                                    value={day.start}
                                                    onChange={e => updateSchedule(dayIdx, 'start', e.target.value)}
                                                    className="w-[80px] bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[12px] font-bold text-gray-700 focus:outline-none focus:border-gray-400"
                                                />
                                                <span className="text-gray-400 text-[11px]">~</span>
                                                <input
                                                    type="time"
                                                    value={day.end}
                                                    onChange={e => updateSchedule(dayIdx, 'end', e.target.value)}
                                                    className="w-[80px] bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[12px] font-bold text-gray-700 focus:outline-none focus:border-gray-400"
                                                />
                                                <div className="flex items-center gap-1 ml-auto shrink-0">
                                                    <span className="text-[10px] text-gray-400 font-bold">上限</span>
                                                    <select
                                                        value={day.slots}
                                                        onChange={e => updateSchedule(dayIdx, 'slots', Number(e.target.value))}
                                                        className="bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-1 text-[12px] font-black text-gray-700 focus:outline-none"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                                                            <option key={n} value={n}>{n}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-[12px] text-gray-400 font-semibold">休息</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-[10px] text-gray-400 font-semibold mt-3 px-1">* 「上限」為該日最大可接受預約數量</p>
                    </div>
                )}

                {/* ── Basic Info ─────────────────────── */}
                <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <h3 className="text-[14px] font-black text-gray-700 mb-4 pb-2 border-b border-gray-100">基本資料</h3>

                    {/* Cover photo */}
                    <div className="relative h-36 bg-gray-100 rounded-[14px] mb-4 overflow-hidden border border-gray-200 group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1520340356584-f9917d1e511c?auto=format&fit=crop&q=80&w=800" alt="cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 font-black text-[13px] text-gray-700 shadow-lg">
                                <Camera size={16} className="text-gray-600" /> 更換封面
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
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">店家介紹</label>
                            <textarea
                                rows={3}
                                defaultValue="體驗極致的汽車護理。我們專業的汽車美容團隊使用最先進的設備..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all resize-none"
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
                                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-[14px] border text-[13px] font-bold transition-all text-left ${active ? 'bg-gray-50 text-gray-900 border-gray-900' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                    <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all ${active ? 'bg-gray-900' : 'bg-gray-200'}`}>
                                        {active && <span className="text-white text-[10px] font-black">✓</span>}
                                    </span>
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-3 text-[11px] font-bold text-gray-600">已選 {selectedTags.length} 個標籤</p>
                </div>

                {/* ── Services ──────────────────────── */}
                <div className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
                        <h3 className="text-[14px] font-black text-gray-700">服務與價格設定</h3>
                        <button className="flex items-center gap-1 text-[12px] font-black text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg active:bg-gray-100 transition-colors">
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
                                        className="w-full bg-transparent font-black text-[14px] text-gray-900 focus:outline-none focus:text-gray-700 transition-colors mb-0.5"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={srv.duration}
                                        className="text-[12px] font-semibold text-gray-400 bg-transparent focus:outline-none w-full"
                                    />
                                </div>
                                <div className="flex items-center border border-gray-200 bg-white rounded-xl px-3 py-2 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-200 transition-all shadow-sm shrink-0">
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
