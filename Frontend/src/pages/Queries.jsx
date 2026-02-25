import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Search, User, Clock, CheckCircle, Info, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Queries = () => {
    const [query, setQuery] = useState('');
    const [queries, setQueries] = useState([
        { id: 1, text: 'Regarding DBMS Normalization assignment - can we use BCNF?', status: 'Resolved', date: '2h ago', response: 'Yes, BCNF is preferred.' },
        { id: 2, text: 'Query about RFID synchronization issues in main hall.', status: 'Pending', date: '5h ago', response: null }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const newQuery = {
            id: Date.now(),
            text: query,
            status: 'Pending',
            date: 'Just now',
            response: null
        };

        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1000)),
            {
                loading: 'Transmitting Signal...',
                success: 'Query Synchronized: Awaiting peer resolution.',
                error: 'Transmission Failure.',
            }
        );

        setQueries([newQuery, ...queries]);
        setQuery('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Query Channel</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Peer-to-Peer Academic Communication</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-5 py-2.5 glass rounded-2xl border-[var(--border-primary)] text-[var(--text-secondary)] flex items-center gap-3">
                        <Filter size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Protocol Filter</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="col-span-1 glass-card bg-white/[0.01] border-[var(--border-primary)] flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 shadow-xl shadow-[var(--accent-primary)]/10">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tighter">Transmit Signal</h3>
                        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-[0.1em] mt-1 italic">Resolution cycle ~2 hours</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Input academic or infrastructural query..."
                            className="w-full h-48 bg-white/5 border border-[var(--border-primary)] rounded-2xl p-4 text-[11px] font-bold outline-none focus:border-[var(--accent-primary)]/30 focus:bg-[var(--accent-primary)]/5 transition-all resize-none placeholder:text-[var(--text-secondary)] text-[var(--text-primary)]"
                        />
                        <button
                            type="submit"
                            className="w-full py-4 bg-[var(--accent-primary)] hover:brightness-110 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-[var(--accent-primary)]/20 group"
                        >
                            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Broadcast Payload
                        </button>
                    </form>
                </div>

                {/* Stream Section */}
                <div className="col-span-2 glass-card-accent border-[var(--border-primary)] flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-black text-[var(--text-primary)] flex items-center gap-3 uppercase tracking-[0.2em]">
                            <Search size={16} className="text-[var(--accent-primary)]" />
                            Active Signal Stream
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {queries.map((q) => (
                                <motion.div
                                    key={q.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-5 rounded-2xl border bg-white/[0.02] transition-all ${q.status === 'Resolved' ? 'border-emerald-500/20' : 'border-[var(--border-primary)]'}`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--text-secondary)]">
                                                <User size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Node ID: S-Protocol</span>
                                                <span className="text-[10px] font-black text-[var(--text-primary)] opacity-40 uppercase">{q.date}</span>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${q.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                            {q.status}
                                        </div>
                                    </div>
                                    <p className="text-[11px] font-bold text-[var(--text-primary)] leading-relaxed mb-4">{q.text}</p>

                                    {q.response && (
                                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
                                            <div className="w-1.5 h-auto bg-emerald-500/40 rounded-full" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CheckCircle size={10} className="text-emerald-500" />
                                                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Peer Resolution</span>
                                                </div>
                                                <p className="text-[10px] italic font-bold text-[var(--text-secondary)]">{q.response}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Queries;
