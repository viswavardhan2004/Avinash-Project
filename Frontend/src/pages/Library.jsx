import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Search, Bookmark, ArrowRight, Star } from 'lucide-react';

const Library = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const books = [
        { id: 1, title: 'Quantum Mechanics: Principles and Applications', author: 'Dr. Sarah Chen', category: 'Physics', available: true, rating: 4.8 },
        { id: 2, title: 'Advanced Data Structures & Algorithms', author: 'Prof. Michael Ross', category: 'Computer Science', available: false, rating: 4.9 },
        { id: 3, title: 'Neurological Bases of Behavior', author: 'Dr. Elena Rodriguez', category: 'Psychology', available: true, rating: 4.7 },
        { id: 4, title: 'Sustainable Architecture in Urban Spaces', author: 'James Wilson', category: 'Architecture', available: true, rating: 4.6 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Knowledge Base</h2>
                    <p className="text-[var(--text-secondary)] text-xs font-black uppercase tracking-[0.2em] mt-2">Central Library Index • Node 04</p>
                </div>
                <div className="flex-1 max-w-xl flex items-center gap-4 bg-white/5 px-6 py-4 rounded-3xl border border-[var(--border-primary)] focus-within:bg-[var(--accent-primary)]/5 focus-within:border-[var(--accent-primary)]/30 transition-all group">
                    <Search size={20} className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)]" />
                    <input
                        type="text"
                        placeholder="Search for manuscripts, journals, or research..."
                        className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)] font-bold placeholder:text-[var(--text-secondary)]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book) => (
                    <motion.div
                        key={book.id}
                        whileHover={{ y: -5 }}
                        className="glass-card-accent p-8 border-[var(--border-primary)] flex gap-8 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/5 blur-[50px] rounded-full group-hover:bg-[var(--accent-primary)]/10 transition-all" />

                        <div className="w-32 h-44 bg-[var(--accent-primary)]/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-[var(--accent-primary)]/20 shadow-2xl relative z-10 transition-all duration-300">
                            <Book size={48} className="text-[var(--accent-primary)]/50" />
                            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20">
                                <Star size={8} className="text-[var(--accent-primary)]" />
                                <span className="text-[8px] font-black text-[var(--accent-primary)] tracking-tighter">{book.rating}</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between py-1 relative z-10 w-full">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-[10px] font-black uppercase tracking-[0.1em] border border-[var(--accent-primary)]/20 italic">
                                        {book.category}
                                    </span>
                                    {book.available ? (
                                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]" />
                                    ) : (
                                        <span className="w-2 h-2 rounded-full bg-[var(--text-secondary)]" />
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-[var(--text-primary)] leading-tight mb-2 uppercase tracking-tight line-clamp-2">{book.title}</h3>
                                <p className="text-sm font-bold text-[var(--text-secondary)] mb-4 italic">By {book.author}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <button className={`flex items-center gap-2 group/btn font-black text-[10px] uppercase tracking-widest transition-all ${book.available ? 'text-[var(--accent-primary)] hover:text-[var(--text-primary)]' : 'text-[var(--text-secondary)] cursor-not-allowed'}`}>
                                    {book.available ? 'Request Access' : 'In Circulation'}
                                    {book.available && <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />}
                                </button>
                                <button className="p-2.5 rounded-xl bg-white/5 border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all">
                                    <Bookmark size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Library;
