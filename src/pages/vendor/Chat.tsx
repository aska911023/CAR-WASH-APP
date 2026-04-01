import { useState, useRef, useEffect } from 'react';
import { Search, Send, Phone, MoreVertical, Check, CheckCheck, Image as ImageIcon, Smile } from 'lucide-react';

const CONVERSATIONS = [
    {
        id: 'C1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        lastMsg: '好的，我大概三點到，謝謝！', time: '13:42', unread: 2, online: true,
        bookingRef: 'BK-5012', service: '頂級陶瓷鍍膜保養',
    },
    {
        id: 'C2', name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
        lastMsg: '請問電動車洗車需要注意什麼嗎？', time: '11:20', unread: 1, online: true,
        bookingRef: 'BK-4985', service: '基礎快速洗車',
    },
    {
        id: 'C3', name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
        lastMsg: '收到，謝謝您的確認！', time: '昨天', unread: 0, online: false,
        bookingRef: 'BK-4920', service: '尊榮內外雙重清潔',
    },
];

const MESSAGES: Record<string, { id: string; from: 'user' | 'shop'; text: string; time: string; read: boolean }[]> = {
    C1: [
        { id: 'm1', from: 'user', text: '您好，我想確認一下我的預約 BK-5012 是否有排進今天下午的時段？', time: '13:30', read: true },
        { id: 'm2', from: 'shop', text: '您好！是的，您的陶瓷鍍膜服務已排在今天下午 3 點，請準時到達。車輛目前狀態非常好，適合施作鍍膜', time: '13:35', read: true },
        { id: 'm3', from: 'user', text: '太好了！請問停車場怎麼走？', time: '13:38', read: true },
        { id: 'm4', from: 'shop', text: '從大門進來後左轉，停車場在建築物後方，有我們的 WashHub 標誌', time: '13:40', read: true },
        { id: 'm5', from: 'user', text: '好的，我大概三點到，謝謝！', time: '13:42', read: false },
    ],
    C2: [
        { id: 'm1', from: 'user', text: '請問電動車洗車需要注意什麼嗎？', time: '11:20', read: false },
    ],
    C3: [
        { id: 'm1', from: 'shop', text: '您的預約已確認！明天上午 11 點見', time: '昨天 15:00', read: true },
        { id: 'm2', from: 'user', text: '收到，謝謝您的確認！', time: '昨天 15:10', read: true },
    ],
};

export default function Chat() {
    const [activeConv, setActiveConv] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [msgs, setMsgs] = useState(MESSAGES);
    const [search, setSearch] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConv, msgs]);

    const sendMsg = () => {
        if (!input.trim() || !activeConv) return;
        const newMsg = { id: `m${Date.now()}`, from: 'shop' as const, text: input.trim(), time: '現在', read: true };
        setMsgs(prev => ({ ...prev, [activeConv]: [...(prev[activeConv] || []), newMsg] }));
        setInput('');
    };

    const conv = CONVERSATIONS.find(c => c.id === activeConv);

    // Chat Detail
    if (conv) {
        const messages = msgs[conv.id] || [];
        return (
            <div className="h-full flex flex-col bg-white">
                {/* Chat header */}
                <div className="px-4 pt-12 pb-3 bg-white border-b border-gray-100 flex items-center gap-3 sticky top-0 z-30">
                    <button onClick={() => setActiveConv(null)} className="text-gray-600 font-black text-[13px]">←</button>
                    <img src={conv.avatar} alt="" className="w-10 h-10 rounded-[12px] object-cover border border-gray-100" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-black text-[15px] text-gray-900">{conv.name}</h3>
                            {conv.online && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                        </div>
                        <p className="text-[11px] text-gray-400 font-semibold">{conv.bookingRef} · {conv.service}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500"><Phone size={15} /></button>
                        <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500"><MoreVertical size={15} /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 nice-scrollbar bg-gray-50/50">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.from === 'shop' ? 'justify-end' : 'justify-start'}`}>
                            {msg.from === 'user' && (
                                <img src={conv.avatar} alt="" className="w-7 h-7 rounded-full object-cover mr-2 mt-auto shrink-0" />
                            )}
                            <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[13px] font-medium leading-relaxed ${msg.from === 'shop'
                                    ? 'bg-gray-900 text-white rounded-tr-sm'
                                    : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm'
                                }`}>
                                <p>{msg.text}</p>
                                <div className={`flex items-center gap-1 mt-1 ${msg.from === 'shop' ? 'justify-end' : 'justify-start'}`}>
                                    <span className={`text-[10px] ${msg.from === 'shop' ? 'text-gray-400' : 'text-gray-400'}`}>{msg.time}</span>
                                    {msg.from === 'shop' && (msg.read ? <CheckCheck size={11} className="text-gray-400" /> : <Check size={11} className="text-gray-400" />)}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2">
                    <button className="w-9 h-9 flex items-center justify-center text-gray-400 active:text-gray-600">
                        <ImageIcon size={18} />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center text-gray-400 active:text-gray-600">
                        <Smile size={18} />
                    </button>
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 focus-within:border-gray-400 transition-all">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMsg()}
                            type="text" placeholder="輸入訊息..."
                            className="w-full bg-transparent text-[13px] text-gray-900 placeholder-gray-400 font-medium focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={sendMsg}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-gray-900 text-white shadow-lg active:scale-95' : 'bg-gray-100 text-gray-400'}`}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        );
    }

    // Conversation list
    return (
        <div className="min-h-screen bg-white text-gray-900 pb-24 font-sans">
            <div className="px-5 pt-12 pb-4 bg-white border-b border-gray-100 sticky top-0 z-30">
                <h1 className="text-[22px] font-black tracking-tight text-gray-900 mb-0.5">訊息中心</h1>
                <p className="text-[12px] text-gray-400 font-semibold mb-3">與客戶即時溝通</p>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-gray-400 transition-all">
                    <Search size={15} className="text-gray-400 mr-2 shrink-0" />
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="搜尋對話..."
                        className="bg-transparent border-none outline-none w-full text-[13px] text-gray-900 placeholder-gray-400 font-medium" />
                </div>
            </div>

            <div className="divide-y divide-gray-50">
                {CONVERSATIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                    <button key={c.id} onClick={() => setActiveConv(c.id)} className="w-full text-left px-5 py-4 flex items-center gap-3 active:bg-gray-50 transition-colors">
                        <div className="relative shrink-0">
                            <img src={c.avatar} alt="" className="w-12 h-12 rounded-[14px] object-cover border border-gray-100" />
                            {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                                <h3 className="font-black text-[14px] text-gray-900">{c.name}</h3>
                                <span className="text-[11px] text-gray-400 font-semibold shrink-0">{c.time}</span>
                            </div>
                            <p className="text-[12px] text-gray-500 font-semibold truncate">{c.bookingRef} · {c.lastMsg}</p>
                        </div>
                        {c.unread > 0 && (
                            <span className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0">
                                {c.unread}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
