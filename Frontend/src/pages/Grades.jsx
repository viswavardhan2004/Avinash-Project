import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Search, Calculator, TrendingUp, Award, Activity } from 'lucide-react';
import { gradeService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TableSkeleton, StatSkeleton } from '../components/Skeletons';

const Grades = () => {
    const { user } = useAuth();
    const [rfid, setRfid] = useState(user?.role === 'STUDENT' ? 'ACCESS_RESTRICTED' : '');
    const [grades, setGrades] = useState([]);
    const [gpa, setGpa] = useState(null);
    const [loading, setLoading] = useState(false);

    const historyData = [
        { name: 'S1', gpa: 3.2 },
        { name: 'S2', gpa: 3.5 },
        { name: 'S3', gpa: 3.4 },
        { name: 'S4', gpa: 3.8 },
    ];

    const handleSearch = () => {
        const searchId = user?.role === 'STUDENT' ? 'S123' : rfid;
        if (!searchId) return;
        setLoading(true);

        Promise.all([
            gradeService.getByRfid(searchId),
            gradeService.calculateGPA(searchId)
        ]).then(([gradesRes, gpaRes]) => {
            setGrades(gradesRes.data);
            setGpa(gpaRes.data);
        }).catch(console.error)
            .finally(() => {
                setTimeout(() => setLoading(false), 800);
            });
    };

    useEffect(() => {
        if (user?.role === 'STUDENT') {
            handleSearch();
        }
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="w-64 h-8 bg-white/5 rounded-lg" />
                    <div className="w-32 h-10 bg-white/5 rounded-2xl" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2"><TableSkeleton /></div>
                    <div className="col-span-1"><StatSkeleton /></div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Academic Metrics</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">GPA Analytics & Grading Records</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-accent rounded-2xl px-5 py-2.5 flex items-center gap-3 border-[var(--accent-primary)]/20 shadow-lg shadow-[var(--accent-primary)]/5">
                        <GraduationCap size={14} className="text-[var(--accent-primary)]" />
                        <span className="text-[9px] font-black text-[var(--accent-primary)] uppercase tracking-[0.2em]">Verified Transcript</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 glass-card-accent border-[var(--border-primary)] flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-[var(--border-primary)] group focus-within:border-[var(--accent-primary)]/30 transition-all">
                            <Search size={18} className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)]" />
                            <input
                                type="text"
                                value={rfid}
                                onChange={(e) => setRfid(e.target.value)}
                                placeholder={user?.role === 'STUDENT' ? "Individual Sync Active" : "Input Identity ID..."}
                                readOnly={user?.role === 'STUDENT'}
                                className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)] font-bold placeholder:text-[var(--text-secondary)]"
                            />
                        </div>
                        {user?.role !== 'STUDENT' && (
                            <button
                                onClick={handleSearch}
                                className="px-8 py-3 bg-[var(--accent-primary)] hover:brightness-110 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white transition-all shadow-xl shadow-[var(--accent-primary)]/20"
                            >
                                Sync Data
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[var(--text-secondary)] text-[9px] font-black uppercase tracking-[0.3em] border-b border-[var(--border-primary)]">
                                    <th className="px-6 py-4">Module Identifier</th>
                                    <th className="px-6 py-4">Session</th>
                                    <th className="px-6 py-4">Weight</th>
                                    <th className="px-6 py-4 text-center">Score</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px]">
                                {grades.length > 0 ? (
                                    grades.map((g) => (
                                        <tr key={g.id} className="border-b border-[var(--border-primary)] hover:bg-[var(--accent-primary)]/5 transition-all">
                                            <td className="px-6 py-5">
                                                <p className="font-black text-[var(--text-primary)] uppercase tracking-tight">{g.courseName || g.subject}</p>
                                                <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase opacity-50">Core Module</p>
                                            </td>
                                            <td className="px-6 py-5 text-[var(--text-secondary)] font-black uppercase text-[9px]">{g.semester || 'TERM-01'}</td>
                                            <td className="px-6 py-5 text-[var(--text-primary)] opacity-50 font-mono text-[10px]">{g.credits} CU</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-black text-sm border border-[var(--accent-primary)]/30 min-w-[45px] inline-block shadow-lg shadow-[var(--accent-primary)]/5">
                                                    {g.grade}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-20 text-[var(--text-secondary)] italic font-black uppercase tracking-[0.2em]">Idle Monitoring</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-span-1 space-y-6">
                    <div className="glass-card flex flex-col items-center justify-center py-10 text-center border-[var(--border-primary)] bg-gradient-to-b from-[var(--accent-primary)]/5 to-transparent relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-[9px] font-black text-[var(--accent-primary)] uppercase tracking-widest opacity-40">System Index</div>
                        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] mb-6 border border-[var(--accent-primary)]/20 shadow-xl shadow-[var(--accent-primary)]/10">
                            <Calculator size={32} />
                        </div>
                        <h3 className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-2">Cumulative Metric</h3>
                        <p className="text-6xl font-black bg-gradient-to-br from-[var(--text-primary)] via-[var(--accent-primary)]/40 to-[var(--accent-primary)] bg-clip-text text-transparent tracking-tighter leading-none">
                            {gpa !== null ? gpa.toFixed(2) : '0.00'}
                        </p>
                        <div className="mt-8 flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--border-primary)] bg-white/5">
                            <Award size={14} className="text-[var(--accent-primary)]" />
                            <span className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-widest leading-none">Global Standing</span>
                        </div>
                    </div>

                    <div className="glass-card border-[var(--border-primary)] bg-gradient-to-br from-[var(--accent-primary)]/5 to-transparent">
                        <h3 className="text-[10px] font-black mb-6 flex items-center gap-2 text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                            <TrendingUp size={16} className="text-[var(--accent-primary)]" />
                            Growth Progression
                        </h3>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={historyData}>
                                    <defs>
                                        <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="natural" dataKey="gpa" stroke="var(--accent-primary)" strokeWidth={2} fill="url(#colorGpa)" />
                                    <XAxis dataKey="name" hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'black', border: '1px solid var(--border-primary)', borderRadius: '12px', fontSize: '9px' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Activity size={14} className="text-[var(--accent-primary)]" />
                                <span className="text-[10px] font-black text-[var(--text-primary)]">+0.4 SEM/D</span>
                            </div>
                            <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase">Verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Grades;
