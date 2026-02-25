import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Library, GraduationCap, BookOpen, Activity, TrendingUp } from 'lucide-react';
import { studentService, timetableService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { StatSkeleton, CardSkeleton } from '../components/Skeletons';

const Dashboard = () => {
    const { user } = useAuth();
    const [studentCount, setStudentCount] = useState(0);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const attendanceData = [
        { name: 'Mon', value: 85 },
        { name: 'Tue', value: 92 },
        { name: 'Wed', value: 88 },
        { name: 'Thu', value: 95 },
        { name: 'Fri', value: 89 },
    ];

    const gradeData = [
        { name: 'Sem 1', gpa: 3.4 },
        { name: 'Sem 2', gpa: 3.6 },
        { name: 'Sem 3', gpa: 3.5 },
        { name: 'Sem 4', gpa: 3.8 },
    ];

    useEffect(() => {
        Promise.all([
            studentService.getAll().then(res => setStudentCount(res.data.length)),
            timetableService.getAll().then(res => setClasses(res.data.slice(0, 5)))
        ]).finally(() => {
            setTimeout(() => setLoading(false), 800); // Artificial delay for skeleton polish
        });
    }, []);

    const stats = [
        { label: 'Network Reach', value: studentCount, icon: Users, trend: '+12%' },
        { label: 'Active Slots', value: '8', icon: Calendar, trend: 'Optimal' },
        { label: 'Knowledge Base', value: '15.6k', icon: Library, trend: '+2.4k' },
        { label: 'Metric Avg', value: 'A-', icon: GraduationCap, trend: 'Stable' },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <StatSkeleton key={i} />)}
                <div className="col-span-3"><CardSkeleton /></div>
                <div className="col-span-1"><CardSkeleton /></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-4 gap-6"
        >
            {/* Stats Grid */}
            {stats.map((stat, idx) => (
                <div key={idx} className="glass-card-accent flex flex-col gap-4 border-[var(--border-primary)] group relative overflow-hidden">
                    <div className="flex justify-between items-start relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                            <stat.icon size={24} />
                        </div>
                        <span className="text-[9px] font-black text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded-full border border-[var(--accent-primary)]/20 uppercase tracking-widest">{stat.trend}</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</h3>
                        <p className="text-2xl font-black text-[var(--text-primary)] mt-1 tracking-tighter">{stat.value}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />
                </div>
            ))}

            {/* Main Content Area: Analytics */}
            <div className="col-span-3 glass-card bg-white/[0.01] border-[var(--border-primary)] flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Operational Analytics</h3>
                        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-[0.2em] mt-1">Real-time attendance telemetry</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[9px] font-black uppercase tracking-widest text-[var(--accent-primary)]">Download PDF</button>
                    </div>
                </div>

                <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={attendanceData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'black', border: '1px solid var(--border-primary)', borderRadius: '12px', fontSize: '10px', fontFamily: 'Inter' }}
                                itemStyle={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-4 pt-4 border-t border-[var(--border-primary)]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Recent Synchronizations</h4>
                    {classes.length > 0 ? classes.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/30 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <Activity size={16} className="text-[var(--accent-primary)] opacity-50" />
                                <p className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight">{item.subject} <span className="text-[var(--text-secondary)] font-normal mx-2 opacity-30">|</span> {item.teacher}</p>
                            </div>
                            <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-50">{item.day} {item.startTime}</span>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-[var(--text-secondary)] italic font-bold">No synchronization packets found</div>
                    )}
                </div>
            </div>

            {/* Sidebar Stats: GPA Growth */}
            <div className="col-span-1 flex flex-col gap-6">
                <div className="glass-card-accent bg-transparent border-[var(--accent-primary)]/10 min-h-[300px] flex flex-col justify-between">
                    <div>
                        <h3 className="font-black text-[var(--text-primary)] uppercase tracking-tighter text-lg leading-tight mb-1">Metric Growth</h3>
                        <p className="text-[9px] text-[var(--text-secondary)] font-black uppercase tracking-[0.2em]">Historical GPA Protocol</p>
                    </div>

                    <div className="flex-1 min-h-[150px] mt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gradeData}>
                                <Bar dataKey="gpa" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
                                <XAxis dataKey="name" hide />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: 'black', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '9px' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-[var(--accent-primary)]" />
                            <span className="text-xs font-black text-[var(--text-primary)]">+8.4%</span>
                        </div>
                        <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Target: 4.0</span>
                    </div>
                </div>

                <div className="glass-card border-[var(--border-primary)]">
                    <h3 className="font-black mb-4 text-[var(--text-primary)] text-[10px] uppercase tracking-[0.2em]">Active Subroutines</h3>
                    <div className="space-y-3">
                        {['Knowledge Base', 'Schedule Sync', 'Global Query'].map(task => (
                            <div key={task} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-[var(--accent-primary)]/5 transition-all">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]" />
                                <span className="text-[10px] font-black text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-all uppercase">{task}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
