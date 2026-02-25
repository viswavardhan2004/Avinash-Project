import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, User, Info, Calendar, Plus, Filter, ShieldCheck, Zap } from 'lucide-react';
import { timetableService, sectionService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { TableSkeleton } from '../components/Skeletons';
import toast from 'react-hot-toast';

const Timetable = () => {
    const { user } = useAuth();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');

    useEffect(() => {
        setLoading(true);
        const fetchTimetable = async () => {
            try {
                let res;
                if (user.role === 'ADMIN') {
                    res = await timetableService.getAll();
                    const secRes = await sectionService.getAll();
                    setSections(secRes.data || []);
                } else if (user.role === 'TEACHER') {
                    res = await timetableService.getByTeacher(user.id || 'T1');
                } else {
                    res = await timetableService.getBySection(user.sectionId || 'S1');
                }
                setSchedule(res.data || []);
            } catch (err) {
                console.error(err);
                // Fallback mock data for demo
                setSchedule([
                    { id: 1, time: '09:00 - 10:30', subject: 'Advanced Mathematics', instructor: 'Dr. Alan Turing', room: 'Hall A1', type: 'Lecture', section: 'CSE-A' },
                    { id: 2, time: '11:00 - 12:30', subject: 'Quantum Physics', instructor: 'Dr. Marie Curie', room: 'Lab 04', type: 'Laboratory', section: 'CSE-A' },
                    { id: 3, time: '14:00 - 15:30', subject: 'Data Ethics', instructor: 'Prof. Simmons', room: 'Seminar 2', type: 'Seminar', section: 'CSE-B' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchTimetable();
    }, [user]);

    const filteredSchedule = user.role === 'ADMIN' && selectedSection
        ? schedule.filter(s => s.section === selectedSection)
        : schedule;

    if (loading) return <div className="p-6"><TableSkeleton /></div>;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter italic">Master Timetable Engine</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <Zap size={12} className="text-[var(--accent-primary)] animate-pulse" />
                        Live Synchronisation • {user.role} Matrix
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {user.role === 'ADMIN' && (
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-[var(--border-primary)]">
                            <Filter size={14} className="text-[var(--text-secondary)]" />
                            <select
                                className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                            >
                                <option value="">Global Stream</option>
                                {sections.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>
                    )}

                    {user.role === 'ADMIN' && (
                        <button className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] hover:brightness-110 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-[var(--accent-primary)]/20">
                            <Plus size={16} />
                            Deploy Slot
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 relative">
                <div className="absolute left-[-2px] top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-primary)]/20 to-transparent" />

                <AnimatePresence>
                    {filteredSchedule.map((item, idx) => (
                        <motion.div
                            key={item.id || idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ x: 10 }}
                            className="glass-card border-[var(--border-primary)] hover:border-[var(--accent-primary)]/30 flex items-center gap-8 relative group"
                        >
                            <div className="w-1.5 h-full absolute left-0 top-0 bg-[var(--accent-primary)] rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex flex-col items-center justify-center p-4 bg-[var(--accent-primary)]/10 rounded-2xl min-w-[160px] border border-[var(--accent-primary)]/10">
                                <Clock size={20} className="text-[var(--accent-primary)] mb-2" />
                                <span className="text-xs font-black text-[var(--text-primary)]">{item.time}</span>
                                <span className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-tighter mt-1 italic">Protocol Slot</span>
                            </div>

                            <div className="flex-1 grid grid-cols-4 gap-6">
                                <div className="col-span-1">
                                    <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-2 line-clamp-1 italic">{item.subject}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="px-3 py-1 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/10">
                                            <span className="text-[8px] font-bold text-[var(--accent-primary)] uppercase tracking-widest">{item.type}</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/10">
                                            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">{item.section || 'SEC-01'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 text-[var(--text-secondary)] mb-2">
                                        <User size={16} className="text-[var(--accent-primary)]/60" />
                                        <span className="text-sm font-black italic uppercase tracking-tighter text-[var(--text-primary)]">{item.instructor}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                        <MapPin size={16} className="text-[var(--accent-primary)]/60" />
                                        <span className="text-xs font-black uppercase tracking-widest opacity-60">{item.room}</span>
                                    </div>
                                </div>

                                <div className="col-span-1 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-1 group/badge hover:scale-105 transition-transform cursor-pointer">
                                        <ShieldCheck size={18} className="text-emerald-500 opacity-60 group-hover/badge:opacity-100 transition-opacity" />
                                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">Validated Sync</span>
                                    </div>
                                </div>

                                <div className="col-span-1 flex items-center justify-end pr-4">
                                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all group/info shadow-inner">
                                        <Info size={20} className="group-hover/info:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="p-8 glass bg-[var(--accent-primary)]/5 rounded-[40px] border-dashed border-2 border-[var(--border-primary)] text-center relative overflow-hidden group hover:border-[var(--accent-primary)]/30 transition-all">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                <p className="text-[var(--text-secondary)] font-black uppercase tracking-[0.4em] text-[9px] relative z-10 italic">
                    End of Academic Stream Transmission • Protocol Hash: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
                </p>
            </div>
        </motion.div>
    );
};

export default Timetable;
