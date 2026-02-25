import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Lock, Fingerprint, Save, Activity } from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useAuth();
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (passwords.next !== passwords.confirm) {
            toast.error("Protocol Mismatch: Confirmation does not match next key.");
            return;
        }
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: 'Updating Security Keys...',
                success: 'Rotation Complete: Security keys updated.',
                error: 'Update Failed: System rejected rotation.',
            }
        );
        setPasswords({ current: '', next: '', confirm: '' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Identity Profile</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Verified Credential Node</p>
                </div>
                <div className="px-5 py-2.5 glass-accent rounded-2xl border-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center gap-3">
                    <Shield size={16} />
                    <span className="text-[9px] font-black uppercase tracking-[0.1em]">Security Level: Optimal</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Identity Metadata (Read Only) */}
                <div className="col-span-1 space-y-6">
                    <div className="glass-card flex flex-col items-center py-10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />
                        <div className="w-24 h-24 rounded-3xl bg-[var(--accent-primary)]/10 p-1 border border-[var(--accent-primary)]/30 group-hover:scale-110 transition-transform duration-500">
                            <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=0a1128&color=ffffff&bold=true`} alt="Identity" />
                            </div>
                        </div>
                        <h3 className="mt-6 text-xl font-black text-[var(--text-primary)] tracking-tight">{user?.name}</h3>
                        <p className="text-[10px] text-[var(--accent-primary)] font-black uppercase tracking-[0.3em]">{user?.role}</p>

                        <div className="mt-8 flex flex-col w-full px-6 gap-3">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <span className="text-[8px] font-black uppercase text-[var(--text-secondary)]">Status</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    <span className="text-[8px] font-black text-emerald-500 uppercase">Authenticated</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card border-[var(--border-primary)] bg-white/[0.01]">
                        <h4 className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4">Metadata Stream</h4>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-black uppercase text-[var(--text-secondary)]">Primary Uplink</span>
                                <span className="text-[11px] font-bold text-[var(--text-primary)]">{user?.email || 'user@campus.edu'}</span>
                            </div>
                            <div className="flex flex-col gap-1 pt-3 border-t border-white/5">
                                <span className="text-[8px] font-black uppercase text-[var(--text-secondary)]">RFID Signature</span>
                                <span className="text-[10px] font-mono text-[var(--accent-primary)] font-black">0x3F4E22A7B</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Rotation Control */}
                <div className="col-span-2 glass-card bg-white/[0.01] border-[var(--border-primary)] flex flex-col gap-8">
                    <div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Security Protocols</h3>
                        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-[0.2em] mt-1">Manual Credential Rotation</p>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Current Key</label>
                                <div className="relative group">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        className="w-full bg-white/5 border border-[var(--border-primary)] rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[var(--accent-primary)]/30 focus:bg-[var(--accent-primary)]/5 transition-all font-mono"
                                        placeholder="••••••••••••"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Next Key</label>
                                    <div className="relative group">
                                        <Fingerprint size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                                        <input
                                            type="password"
                                            required
                                            value={passwords.next}
                                            onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                                            className="w-full bg-white/5 border border-[var(--border-primary)] rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[var(--accent-primary)]/30 focus:bg-[var(--accent-primary)]/5 transition-all font-mono"
                                            placeholder="••••••••••••"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Verify Next</label>
                                    <div className="relative group">
                                        <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                                        <input
                                            type="password"
                                            required
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            className="w-full bg-white/5 border border-[var(--border-primary)] rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-[var(--accent-primary)]/30 focus:bg-[var(--accent-primary)]/5 transition-all font-mono"
                                            placeholder="••••••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <Activity size={16} className="text-emerald-500 opacity-50" />
                                <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase">System Status: Stable</span>
                            </div>
                            <button
                                type="submit"
                                className="flex items-center gap-3 px-10 py-4 bg-[var(--accent-primary)] hover:brightness-110 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white transition-all shadow-2xl shadow-[var(--accent-primary)]/30"
                            >
                                <Save size={16} />
                                Update Protocol
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
