import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Activity, Palette } from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationPanel from './NotificationPanel';
import toast from 'react-hot-toast';

const Header = () => {
    const { user } = useAuth();
    const { accentColor, changeAccent } = useTheme();
    const [showPicker, setShowPicker] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const pickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="glass rounded-3xl p-4 flex items-center justify-between z-50 border-[var(--border-primary)]">
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 w-64 focus-within:bg-[var(--accent-primary)]/5 focus-within:border-[var(--accent-primary)]/30 transition-all group">
                <Search size={18} className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)]" />
                <input
                    type="text"
                    placeholder="Global Query..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[var(--text-secondary)] text-[var(--text-primary)] font-bold"
                />
            </div>

            <div className="flex items-center gap-4">
                {/* Advanced Dynamic Color Picker */}
                <div className="relative" ref={pickerRef}>
                    <button
                        onClick={() => setShowPicker(!showPicker)}
                        className="flex items-center gap-2 p-2.5 glass rounded-2xl border-[var(--border-primary)] bg-white/5 hover:border-[var(--accent-primary)]/40 transition-all"
                        style={{ color: accentColor }}
                    >
                        <Palette size={18} />
                        <div className="w-4 h-4 rounded-full shadow-inner border border-white/10" style={{ backgroundColor: accentColor }} />
                    </button>

                    <AnimatePresence>
                        {showPicker && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full right-0 mt-3 p-4 glass rounded-3xl border-[var(--border-primary)] bg-black/90 shadow-2xl z-[100] w-48"
                            >
                                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-3">Chroma Sync</p>
                                <input
                                    type="color"
                                    value={accentColor}
                                    onChange={(e) => changeAccent(e.target.value)}
                                    className="w-full h-12 rounded-xl bg-transparent cursor-pointer border-none p-0 overflow-hidden mb-4"
                                />
                                <div className="grid grid-cols-4 gap-2">
                                    {['#1d4ed8', '#dc2626', '#7c3aed', '#059669', '#f59e0b', '#ec4899', '#06b6d4', '#ffffff'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => changeAccent(c)}
                                            className="w-full aspect-square rounded-lg border border-white/5 hover:scale-110 transition-transform"
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <p className="text-[8px] font-mono text-center text-[var(--text-secondary)]">{accentColor.toUpperCase()}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10">
                    <Activity size={14} className="text-[var(--accent-primary)]" />
                    <span className="text-[9px] font-black text-[var(--accent-primary)] uppercase tracking-widest italic">Signal Stable</span>
                </div>

                <button
                    onClick={() => setShowNotifications(true)}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all relative border-[var(--border-primary)] bg-white/5"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full border border-black shadow-[0_0_8px_var(--accent-glow)]" />
                </button>

                <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

                <div className="flex items-center gap-3 pl-4 border-l border-[var(--border-primary)]">
                    <div className="text-right">
                        <p className="text-sm font-black text-[var(--text-primary)] tracking-tight leading-none mb-1">{user?.name || 'Identity'}</p>
                        <p className="text-[9px] text-[var(--accent-primary)] font-black uppercase tracking-[0.2em]">{user?.role || 'Guest'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/20 p-[1px] shadow-xl shadow-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30">
                        <div className="w-full h-full rounded-xl bg-black flex items-center justify-center overflow-hidden">
                            <img src={`https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=0a1128&color=${accentColor.replace('#', '')}&bold=true`} alt="User" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
