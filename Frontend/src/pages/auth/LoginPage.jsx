import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Shield, GraduationCap, Laptop, Lock } from 'lucide-react';
import { useAuth } from '../../services/AuthContext';
import { useTheme } from '../../services/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [role, setRole] = useState('STUDENT');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (role === 'ADMIN') {
            if (username === 'admin' && password === 'admin') {
                login(role, { name: 'System Administrator', id: 'ADMIN_001' });
                navigate('/');
            } else {
                alert('CRITICAL ERROR: Invalid Administrative Credentials');
            }
            return;
        }

        if (!username) return alert('Please input identity');
        login(role, { name: username });
        navigate('/');
    };

    const roles = [
        { id: 'STUDENT', label: 'Student', icon: GraduationCap },
        { id: 'TEACHER', label: 'Teacher', icon: Laptop },
        { id: 'ADMIN', label: 'Admin', icon: Shield },
    ];

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[var(--bg-primary)]">
            {/* Dynamic Background Decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--accent-primary)]/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[var(--accent-primary)]/5 blur-[150px] rounded-full" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md glass-card-accent p-10 z-10 border-[var(--border-primary)]"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[var(--accent-primary)] rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-xl shadow-[var(--accent-primary)]/20 text-white border border-white/10 transition-all duration-500">
                        C
                    </div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight uppercase">Access Portal</h1>
                    <p className="text-[var(--text-secondary)] text-sm mt-2 font-bold uppercase tracking-widest">Master Synchronisation Node</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] pl-1">Select Access Protocol</label>
                        <div className="grid grid-cols-3 gap-3">
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setRole(r.id)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${role === r.id
                                        ? 'bg-[var(--accent-primary)]/20 border-[var(--accent-primary)] text-[var(--text-primary)] shadow-lg shadow-[var(--accent-primary)]/10'
                                        : 'bg-white/5 border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-white/10'
                                        }`}
                                >
                                    <r.icon size={20} className={role === r.id ? 'text-[var(--accent-primary)]' : 'text-inherit'} />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">{r.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                            <input
                                type="text"
                                placeholder="Identity Key"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-[var(--border-primary)] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[var(--accent-primary)]/50 focus:bg-[var(--accent-primary)]/5 transition-all text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] font-bold text-sm"
                            />
                        </div>
                        <div className="relative group">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                            <input
                                type="password"
                                placeholder="Session Token"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-[var(--border-primary)] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[var(--accent-primary)]/50 focus:bg-[var(--accent-primary)]/5 transition-all text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] font-bold text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-[var(--accent-primary)] hover:brightness-110 rounded-2xl font-black text-white shadow-xl shadow-[var(--accent-primary)]/20 transition-all border border-white/10 uppercase tracking-widest text-xs"
                    >
                        Sychronize Access
                    </button>
                </form>

                <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-[var(--text-secondary)]">Identity unauthorized? </span>
                    <Link to="/signup" className="text-[var(--accent-primary)] hover:brightness-125 transition-colors">Request Credentials</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
