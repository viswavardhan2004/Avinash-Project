import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Calendar,
    Activity,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    BarChart3,
    PieChart,
    ArrowUpRight,
    ShieldAlert
} from 'lucide-react';
import NotificationBroadcaster from '../../components/NotificationBroadcaster';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Cell, PieChart as RePie, Pie
} from 'recharts';
import { sectionService, studentService } from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeSections: 0,
        avgAttendance: 0,
        topGpa: 0
    });
    const [loading, setLoading] = useState(true);
    const [showBroadcaster, setShowBroadcaster] = useState(false);

    const sectionComparison = [
        { name: 'CSE-A', attendance: 92, performance: 8.4 },
        { name: 'CSE-B', attendance: 85, performance: 7.9 },
        { name: 'ECE-A', attendance: 88, performance: 8.1 },
        { name: 'ME-A', attendance: 78, performance: 7.2 },
    ];

    const distributionData = [
        { name: 'CSE', value: 400, color: 'var(--accent-primary)' },
        { name: 'ECE', value: 300, color: '#7c3aed' },
        { name: 'ME', value: 300, color: '#ec4899' },
    ];

    useEffect(() => {
        Promise.all([
            studentService.getAll(),
            sectionService.getAll()
        ]).then(([stdRes, secRes]) => {
            setStats({
                totalStudents: stdRes.data?.length || 1240,
                activeSections: secRes.data?.length || 18,
                avgAttendance: 88.4,
                topGpa: 9.8
            });
        }).finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header / Command Center */}
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter italic">Intelligence Command</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
                        <ShieldAlert size={14} className="text-[var(--accent-primary)] animate-pulse" />
                        Global Campus Telemetry • Real-time Stream
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowBroadcaster(true)}
                        className="px-5 py-2.5 bg-[var(--accent-primary)] hover:brightness-110 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all shadow-xl shadow-[var(--accent-primary)]/20"
                    >
                        Global Broadcast
                    </button>
                    <div className="px-5 py-2.5 glass rounded-2xl border-[var(--border-primary)] bg-white/5 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]">System Node: Stable</span>
                    </div>
                </div>
            </div>

            {/* High Level Stats */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: 'Total Enrollment', value: stats.totalStudents, icon: Users, trend: '+4.2%' },
                    { label: 'Active Clusters', value: stats.activeSections, icon: Calendar, trend: 'Synced' },
                    { label: 'Mean Stability', value: `${stats.avgAttendance}%`, icon: Activity, trend: '+1.8%' },
                    { label: 'Peak Metric', value: stats.topGpa, icon: TrendingUp, trend: 'Optimal' }
                ].map((s, i) => (
                    <div key={i} className="glass-card-accent p-6 border-[var(--border-primary)] group hover:scale-[1.02] transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 shadow-xl shadow-[var(--accent-primary)]/10">
                                <s.icon size={24} />
                            </div>
                            <span className="text-[8px] font-black text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded-full border border-[var(--accent-primary)]/20 uppercase tracking-widest leading-none">{s.trend}</span>
                        </div>
                        <h3 className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-1">{s.label}</h3>
                        <p className="text-3xl font-black text-[var(--text-primary)] tracking-tighter italic uppercase">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Section Comparison Heatmap */}
                <div className="col-span-2 glass-card border-[var(--border-primary)] space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Section Metric Matrix</h3>
                            <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-[0.2em] mt-1">Cross-cluster performance analytics</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-[9px] font-black text-[var(--text-secondary)] uppercase hover:text-[var(--accent-primary)] transition-colors">
                                <BarChart3 size={14} />
                                View Full Report
                            </button>
                        </div>
                    </div>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectionComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{ backgroundColor: 'black', border: '1px solid var(--border-primary)', borderRadius: '16px', fontSize: '10px' }}
                                />
                                <Bar dataKey="attendance" name="Attendance Sync" fill="var(--accent-primary)" radius={[6, 6, 0, 0]} barSize={40} />
                                <Bar dataKey="performance" name="Academic Metric" fill="#7c3aed" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stream Distribution */}
                <div className="col-span-1 glass-card border-[var(--border-primary)] flex flex-col items-center justify-center p-0 overflow-hidden">
                    <div className="w-full p-8 border-b border-[var(--border-primary)] bg-white/5">
                        <h3 className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-[0.3em] flex items-center gap-2">
                            <PieChart size={14} className="text-[var(--accent-primary)]" />
                            Stream Allocation
                        </h3>
                    </div>
                    <div className="flex-1 w-full h-full flex items-center justify-center min-h-[300px] relative">
                        <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                            <p className="text-3xl font-black text-[var(--text-primary)] leading-none italic uppercase">1240</p>
                            <p className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mt-1">Total Payload</p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <RePie>
                                <Pie
                                    data={distributionData}
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePie>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full p-6 space-y-3 bg-black/40">
                        {distributionData.map((d, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{d.name}</span>
                                </div>
                                <span className="text-[10px] font-black text-[var(--text-primary)]">{((d.value / 1000) * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Alerts / Low Attendance List */}
                <div className="glass-card border-red-500/20 bg-red-500/[0.02] space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-black text-red-500 uppercase tracking-[0.3em] flex items-center gap-2 underline underline-offset-8 decoration-red-500/30">
                            <AlertTriangle size={16} />
                            Critical Attendance Deviations
                        </h3>
                        <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-[8px] font-black uppercase">Low Sync Detected</span>
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'Marcus Holloway', section: 'CSE-A', rate: '68%', id: 'S-712' },
                            { name: 'Elena Fisher', section: 'ECE-B', rate: '72%', id: 'S-844' },
                            { name: 'Victor Sullivan', section: 'ME-A', rate: '64%', id: 'S-209' }
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-red-500/30 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 font-black text-xs">
                                        {s.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-tight">{s.name}</p>
                                        <p className="text-[9px] text-[var(--text-secondary)] font-bold italic opacity-60">{s.id} • {s.section}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-red-500 tracking-tighter leading-none mb-1">{s.rate}</p>
                                    <button className="text-[8px] font-black text-[var(--accent-primary)] uppercase hover:underline">Issue Warning</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performers Leaderboard */}
                <div className="glass-card-accent border-[var(--accent-primary)]/20 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-black text-[var(--accent-primary)] uppercase tracking-[0.3em] flex items-center gap-2">
                            <ArrowUpRight size={16} />
                            Academic Pinnacle Leaders
                        </h3>
                        <CheckCircle size={16} className="text-emerald-500 opacity-60" />
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'Lara Croft', section: 'CSE-A', gpa: '9.82', rank: '01' },
                            { name: 'Nathan Drake', section: 'CSE-B', gpa: '9.65', rank: '02' },
                            { name: 'Aloy Sobeck', section: 'ECE-A', gpa: '9.54', rank: '03' }
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/40 transition-all group">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-black text-[var(--accent-primary)] opacity-20 group-hover:opacity-40 transition-opacity italic">{s.rank}</span>
                                    <div>
                                        <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-tight">{s.name}</p>
                                        <p className="text-[9px] text-[var(--text-secondary)] font-bold italic opacity-60">{s.section} • Verified</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-[var(--text-primary)] tracking-tighter leading-none italic">{s.gpa}</p>
                                    <p className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-widest mt-1">GPA PROTOCOL</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <NotificationBroadcaster
                isOpen={showBroadcaster}
                onClose={() => setShowBroadcaster(false)}
            />
        </motion.div>
    );
};

export default AdminDashboard;
