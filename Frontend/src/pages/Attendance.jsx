import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, ShieldAlert, Activity, BarChart3 } from 'lucide-react';
import { attendanceService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TableSkeleton, StatSkeleton } from '../components/Skeletons';

const Attendance = () => {
    const { user } = useAuth();
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const trendData = [
        { name: 'W1', value: 92 },
        { name: 'W2', value: 88 },
        { name: 'W3', value: 95 },
        { name: 'W4', value: 91 },
    ];

    useEffect(() => {
        attendanceService.getAll()
            .then(res => setAttendance(res.data))
            .catch(console.error)
            .finally(() => {
                setTimeout(() => setLoading(false), 800);
            });
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="w-64 h-8 bg-white/5 rounded-lg" />
                    <div className="w-32 h-10 bg-white/5 rounded-2xl" />
                </div>
                <TableSkeleton />
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
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Attendance Telemetry</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">RFID Registry & Signal Stream</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-accent rounded-2xl px-5 py-2.5 flex items-center gap-3 border-[var(--accent-primary)]/20 shadow-lg shadow-[var(--accent-primary)]/5">
                        <Activity size={14} className="text-[var(--accent-primary)] animate-pulse" />
                        <span className="text-[9px] font-black text-[var(--accent-primary)] uppercase tracking-[0.2em]">Active Link: 0x234F</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 glass-card bg-white/[0.01] border-[var(--border-primary)]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[11px] font-black text-[var(--text-primary)] flex items-center gap-3 uppercase tracking-[0.2em]">
                            <Clock size={16} className="text-[var(--accent-primary)]" />
                            Signal Registry
                        </h3>
                        <div className="text-[9px] text-[var(--text-secondary)] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            Packets: {attendance.length}
                        </div>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[var(--text-secondary)] text-[9px] font-black uppercase tracking-[0.3em] border-b border-[var(--border-primary)]">
                                    <th className="px-6 py-4">Subject Vector</th>
                                    <th className="px-6 py-4">Identity</th>
                                    <th className="px-6 py-4">Temporal Stamp</th>
                                    <th className="px-6 py-4 text-center">Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px]">
                                {attendance.length > 0 ? (
                                    attendance.map((record) => (
                                        <tr key={record.id} className="border-b border-[var(--border-primary)] hover:bg-[var(--accent-primary)]/5 transition-all">
                                            <td className="px-6 py-5">
                                                <p className="font-black text-[var(--text-primary)] uppercase tracking-tight">{record.subject}</p>
                                                <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase opacity-50">Section A-1</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 font-black text-[9px]">
                                                        {record.student?.name?.[0] || 'U'}
                                                    </div>
                                                    <span className="font-bold text-[var(--text-primary)] opacity-80">{record.student?.name || 'RFID_NODE_' + record.id.slice(-4)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-[var(--text-primary)] font-mono opacity-50">
                                                <div className="flex flex-col">
                                                    <span>{new Date(record.date).toLocaleDateString()}</span>
                                                    <span className="text-[var(--accent-primary)]/40 font-black text-[9px] uppercase">{record.timestamp ? new Date(record.timestamp).toLocaleTimeString() : 'SYNCHRONIZED'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    {record.status === 'P' ? (
                                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 shadow-[0_0_15px_var(--accent-glow)]/10">
                                                            <CheckCircle size={12} />
                                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/90">Verified</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-[var(--text-secondary)] border border-[var(--border-primary)] opacity-40">
                                                            <ShieldAlert size={12} />
                                                            <span className="text-[8px] font-black uppercase tracking-widest">Null Signal</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-20 text-[var(--text-secondary)] italic font-black uppercase tracking-[0.3em]">Empty Signal Buffer</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-span-1 flex flex-col gap-6">
                    <div className="glass-card border-[var(--border-primary)] flex-1">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-6 flex items-center gap-2">
                            <BarChart3 size={14} className="text-[var(--accent-primary)]" />
                            Weekly Stability
                        </h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <Area type="step" dataKey="value" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.1} />
                                    <XAxis dataKey="name" hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'black', border: '1px solid var(--border-primary)', fontSize: '10px' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase mb-1">Packet Success Rate</p>
                                <p className="text-lg font-black text-[var(--text-primary)]">94.2%</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20">
                                <p className="text-[9px] font-black text-[var(--accent-primary)] uppercase mb-1">Mean Time to Sync</p>
                                <p className="text-lg font-black text-[var(--text-primary)]">142ms</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Attendance;
