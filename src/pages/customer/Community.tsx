import { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, PenSquare, MapPin, X, Image as ImageIcon, Hash, Send, ChevronDown, CheckCircle2 } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────
interface Post {
    id: number;
    user: string;
    avatar: string;
    time: string;
    content: string;
    image: string | null;
    likes: number;
    comments: number;
    tags?: string[];
    isOwn?: boolean;
    pending?: boolean;
}

// ── Mock Data ──────────────────────────────────────────────────────
const INIT_DISCOVER: Post[] = [
    { id: 1, user: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', time: '2 小時前', content: '剛在 Elite Auto Spa 做完陶瓷鍍膜，光澤太扯了！強烈推薦！🚗✨', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80', likes: 124, comments: 18, tags: ['鍍膜', '新車保養'] },
    { id: 2, user: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', time: '1 天前', content: '星期日的洗車療癒時光 🧽', image: 'https://images.unsplash.com/photo-1552822765-b772223a4170?w=600&auto=format&fit=crop&q=80', likes: 389, comments: 42, tags: ['洗車日記'] },
    { id: 3, user: 'Mei Liu', avatar: 'https://i.pravatar.cc/150?u=b042581f4e29026704a', time: '3 天前', content: '用了頂級棕櫚蠟保養，效果真的不錯👍', image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&auto=format&fit=crop&q=80', likes: 87, comments: 12, tags: ['上蠟', '保養心得'] },
    { id: 4, user: 'Jason Wu', avatar: 'https://i.pravatar.cc/150?u=c042581f4e29026704b', time: '5 天前', content: '新車交車！開始定期保養計畫 🎉', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80', likes: 256, comments: 31, tags: ['新車'] },
];

const INIT_FOLLOW: Post[] = [
    { id: 5, user: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', time: '5 小時前', content: '有人能推薦優質的內裝美容店家嗎？我的小孩把後座毀了 😭', image: null, likes: 32, comments: 45 },
    { id: 6, user: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', time: '1 天前', content: '今天天氣好，洗完車心情也跟著好！附上剛洗完的愛車照 🚙', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=80', likes: 67, comments: 9 },
];

const TABS = ['關注', '發現', '附近'];
const PRESET_TAGS = ['洗車日記', '鍍膜', '保養心得', '新車', '電動車', '改裝', '店家推薦', '問題求助'];
const DEMO_IMAGES = [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=80',
];

// ── Post Card (shared) ──────────────────────────────────────────────
function PostCard({ post, compact = false, liked, onLike }: { post: Post; compact?: boolean; liked: boolean; onLike: () => void }) {
    return (
        <div className={`bg-white border border-brand-50 rounded-[20px] ${compact ? 'overflow-hidden shadow-card' : 'p-4 shadow-card'}`}>
            {compact ? (
                <>
                    {post.image && <img src={post.image} alt="" className="w-full object-cover" style={{ height: post.id % 2 === 0 ? 160 : 120 }} />}
                    <div className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <img src={post.avatar} alt={post.user} className="w-7 h-7 rounded-full border border-brand-100 object-cover" />
                            <div>
                                <p className="font-black text-[12px] text-neutral-800 leading-tight">{post.user}</p>
                                <p className="text-[10px] text-neutral-400 font-medium">{post.time}</p>
                            </div>
                        </div>
                        {post.pending && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mb-1.5">
                                ⏳ 審核中
                            </span>
                        )}
                        <p className="text-[12px] text-neutral-600 leading-relaxed mb-2">{post.content}</p>
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {post.tags.map(t => <span key={t} className="text-[10px] font-bold text-brand-500">#{t}</span>)}
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-neutral-400 text-[11px] font-bold">
                            <button onClick={onLike} className={`flex items-center gap-1 transition-colors ${liked ? 'text-pink-500' : ''}`}>
                                <Heart size={14} className={liked ? 'fill-pink-500' : ''} />
                                {post.likes + (liked ? 1 : 0)}
                            </button>
                            <button className="flex items-center gap-1 active:text-brand-500 transition-colors">
                                <MessageCircle size={14} /> {post.comments}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                            <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-[12px] border border-brand-100 object-cover" />
                            <div>
                                <h4 className="font-black text-[14px] text-neutral-900 leading-tight">{post.user}</h4>
                                <span className="text-[11px] font-medium text-neutral-400">{post.time}</span>
                            </div>
                        </div>
                        <button className="text-neutral-300 active:text-neutral-700 p-1"><MoreHorizontal size={18} /></button>
                    </div>
                    {post.pending && (
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-xl mb-3">
                            ⏳ 您的貼文正在審核中，審核通過後將對所有人顯示
                        </div>
                    )}
                    <p className="text-[13px] text-neutral-700 leading-relaxed mb-3">{post.content}</p>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.map(t => (
                                <span key={t} className="text-[11px] font-bold text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">#{t}</span>
                            ))}
                        </div>
                    )}
                    {post.image && (
                        <div className="rounded-[14px] overflow-hidden mb-3 border border-brand-50">
                            <img src={post.image} alt="" className="w-full h-[180px] object-cover" />
                        </div>
                    )}
                    <div className="flex items-center gap-5 pt-2 border-t border-neutral-50 text-neutral-400 font-bold text-[13px]">
                        <button onClick={onLike} className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-pink-500' : ''}`}>
                            <Heart size={16} className={liked ? 'fill-pink-500' : ''} />
                            {post.likes + (liked ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-1.5 active:text-brand-500 transition-colors">
                            <MessageCircle size={16} /> {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 active:text-green-500 transition-colors ml-auto">
                            <Share2 size={16} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────
export default function Community() {
    const [activeTab, setActiveTab] = useState('發現');
    const [liked, setLiked] = useState<number[]>([]);
    const [discoverPosts, setDiscoverPosts] = useState<Post[]>(INIT_DISCOVER);
    const [followPosts, setFollowPosts] = useState<Post[]>(INIT_FOLLOW);

    // Post composer state
    const [showComposer, setShowComposer] = useState(false);
    const [draftText, setDraftText] = useState('');
    const [draftImage, setDraftImage] = useState<string | null>(null);
    const [draftTags, setDraftTags] = useState<string[]>([]);
    const [customTag, setCustomTag] = useState('');
    const [showTagInput, setShowTagInput] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const toggleLike = (id: number) => {
        setLiked(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
    };

    const toggleTag = (tag: string) => {
        setDraftTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const addCustomTag = () => {
        const t = customTag.replace(/^#/, '').trim();
        if (t && !draftTags.includes(t)) setDraftTags(prev => [...prev, t]);
        setCustomTag('');
        setShowTagInput(false);
    };

    const handlePublish = () => {
        if (!draftText.trim()) return;
        const newPost: Post = {
            id: Date.now(),
            user: '車主小明',
            avatar: 'https://i.pravatar.cc/150?u=washhub_me',
            time: '剛剛',
            content: draftText.trim(),
            image: draftImage,
            likes: 0,
            comments: 0,
            tags: draftTags,
            isOwn: true,
            pending: true,
        };
        setDiscoverPosts(prev => [newPost, ...prev]);
        setFollowPosts(prev => [newPost, ...prev]);
        setDraftText('');
        setDraftImage(null);
        setDraftTags([]);
        setShowComposer(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setActiveTab('發現');
    };

    const canPublish = draftText.trim().length > 0;

    return (
        <div className="min-h-screen text-neutral-900 bg-[#f0f4ff] pb-28">

            {/* ── Header ─────────────────────────────── */}
            <div className="px-5 pt-10 pb-0 sticky top-0 z-30 bg-[#f0f4ff]">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-[22px] font-black tracking-tight" style={{ color: '#1e3a8a' }}>車友圈</h1>
                        <p className="text-[12px] font-semibold" style={{ color: '#3b82f6' }}>分享車輛大小事 · 真實評價</p>
                    </div>
                    <button
                        onClick={() => setShowComposer(true)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl active:scale-95 transition-all text-[12px] font-black text-white"
                        style={{ background: '#2563eb', boxShadow: '0 4px 20px rgba(37,99,235,0.3)' }}
                    >
                        <PenSquare size={15} /> 發文
                    </button>
                </div>

                {/* Submitted toast */}
                {submitted && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-[12px] font-black px-3 py-2 rounded-xl mb-3 animate-in">
                        <CheckCircle2 size={14} /> 貼文已送出，審核通過後即可公開！
                    </div>
                )}

                {/* Tabs */}
                <div className="flex" style={{ borderBottom: '1px solid #dbeafe' }}>
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="flex-1 py-2.5 text-[13px] font-black tracking-wide transition-all border-b-2"
                            style={activeTab === tab
                                ? { color: '#2563eb', borderColor: '#2563eb' }
                                : { color: '#737373', borderColor: 'transparent' }
                            }
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── 發現: Masonry 2-col ────────────────── */}
            {activeTab === '發現' && (
                <div className="px-4 pt-4">
                    <div className="masonry-2col">
                        {discoverPosts.map(post => (
                            <div key={post.id} className="masonry-item">
                                <PostCard post={post} compact liked={liked.includes(post.id)} onLike={() => toggleLike(post.id)} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── 關注: Single column ────────────────── */}
            {activeTab === '關注' && (
                <div className="px-4 pt-4 space-y-3">
                    {followPosts.map(post => (
                        <PostCard key={post.id} post={post} liked={liked.includes(post.id)} onLike={() => toggleLike(post.id)} />
                    ))}
                </div>
            )}

            {/* ── 附近 ───────────────────────────────── */}
            {activeTab === '附近' && (
                <div className="px-5 pt-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                        <MapPin size={36} className="text-brand-500" />
                    </div>
                    <h3 className="text-[17px] font-black text-neutral-800 mb-2">探索附近車友</h3>
                    <p className="text-[13px] text-neutral-400 font-medium max-w-[240px]">開啟定位後，即可看到附近車友的即時動態與評價</p>
                    <button className="mt-6 px-6 py-3 bg-brand-600 text-white rounded-2xl font-black text-[14px] shadow-blue-glow active:scale-95 transition-all">
                        開啟定位權限
                    </button>
                </div>
            )}

            {/* ══════════════════════════════════════════
                POST COMPOSER BOTTOM SHEET
            ══════════════════════════════════════════ */}
            {showComposer && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.5)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowComposer(false); }}>

                    <div className="bg-white rounded-t-[28px] w-full max-w-[430px] mx-auto overflow-hidden"
                        style={{ maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>

                        {/* Sheet Header */}
                        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-neutral-100 shrink-0">
                            <button onClick={() => setShowComposer(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                                <X size={16} />
                            </button>
                            <h2 className="text-[15px] font-black text-neutral-900">發佈貼文</h2>
                            <button
                                onClick={handlePublish}
                                disabled={!canPublish}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-[13px] transition-all ${canPublish
                                    ? 'bg-brand-600 text-white shadow-blue-glow active:scale-95'
                                    : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
                                    }`}
                            >
                                <Send size={13} /> 發送
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6 space-y-4">

                            {/* Author row */}
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/150?u=washhub_me" alt="" className="w-10 h-10 rounded-[12px] border border-brand-100 object-cover" />
                                <div>
                                    <p className="font-black text-[14px] text-neutral-900">車主小明</p>
                                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-semibold">
                                        <span>公開</span> <ChevronDown size={12} />
                                    </div>
                                </div>
                            </div>

                            {/* Text input */}
                            <textarea
                                ref={textRef}
                                value={draftText}
                                onChange={e => setDraftText(e.target.value)}
                                placeholder="分享你的愛車故事、用車心得、好店推薦…"
                                rows={5}
                                className="w-full resize-none text-[14px] text-neutral-800 placeholder-neutral-300 font-medium leading-relaxed border-none outline-none bg-transparent"
                                autoFocus
                            />

                            {/* Tag display */}
                            {draftTags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {draftTags.map(t => (
                                        <button key={t} onClick={() => toggleTag(t)}
                                            className="flex items-center gap-1 text-[11px] font-black text-brand-600 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">
                                            #{t} <X size={10} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Image preview */}
                            {draftImage && (
                                <div className="relative rounded-[14px] overflow-hidden border border-brand-50">
                                    <img src={draftImage} alt="" className="w-full h-[180px] object-cover" />
                                    <button
                                        onClick={() => setDraftImage(null)}
                                        className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="border-t border-neutral-100" />

                            {/* Toolbar */}
                            <div>
                                <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest mb-2.5">新增內容</p>
                                <div className="flex gap-2 mb-4">
                                    {/* Demo image picker */}
                                    <button
                                        onClick={() => setDraftImage(DEMO_IMAGES[Math.floor(Math.random() * DEMO_IMAGES.length)])}
                                        className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-50 border border-brand-200 text-brand-600 rounded-xl text-[12px] font-black"
                                    >
                                        <ImageIcon size={14} /> 圖片
                                    </button>
                                    <button
                                        onClick={() => setShowTagInput(v => !v)}
                                        className="flex items-center gap-1.5 px-3.5 py-2 bg-violet-50 border border-violet-200 text-violet-600 rounded-xl text-[12px] font-black"
                                    >
                                        <Hash size={14} /> 話題
                                    </button>
                                </div>

                                {/* Tag selector */}
                                {showTagInput && (
                                    <div className="animate-in space-y-2.5">
                                        <div className="flex flex-wrap gap-1.5">
                                            {PRESET_TAGS.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => toggleTag(tag)}
                                                    className={`text-[11px] font-black px-2.5 py-1 rounded-full border transition-all ${draftTags.includes(tag)
                                                        ? 'bg-brand-600 text-white border-brand-600'
                                                        : 'bg-white text-neutral-600 border-neutral-200'
                                                        }`}
                                                >
                                                    #{tag}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                value={customTag}
                                                onChange={e => setCustomTag(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && addCustomTag()}
                                                placeholder="自訂話題標籤…"
                                                className="flex-1 text-[12px] bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 font-medium"
                                            />
                                            <button onClick={addCustomTag} className="px-3 py-2 bg-brand-600 text-white rounded-xl text-[12px] font-black">新增</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Character count */}
                            <div className="flex justify-end">
                                <span className={`text-[11px] font-bold ${draftText.length > 450 ? 'text-red-500' : 'text-neutral-300'}`}>
                                    {draftText.length} / 500
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
