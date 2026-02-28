import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, User, Info, Calendar, Plus, Filter, ShieldCheck, Zap, X, Save, Edit2, Trash2 } from 'lucide-react';
import { timetableService, sectionService, teacherService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { TableSkeleton } from '../components/Skeletons';
import toast from 'react-hot-toast';

/* ── Add / Edit Modal ────────────────────────────────────── */
const TimetableModal = ({ slot, sections, teachers, onClose, onSave }) => {
    const [form, setForm] = useState(
        slot || {
            time: '', subject: '', instructor: '', teacherId: '',
            room: '', type: 'Lecture', section: '', sectionId: '', day: 'Monday'
        }
    );
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave(form);
        } catch (err) {
            toast.error('Failed to save timeslot');
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="glass-card-accent w-full max-w-lg p-6 border-[var(--border-primary)] relative shadow-2xl">
                <button onClick={onClose} className="absolute right-6 top-6 text-[var(--text-secondary)] hover:text-white transition-colors">
                    <X size={20} />
                </button>
                <div className="mb-6">
                    <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter italic">
                        {slot ? 'Edit Slot' : 'Deploy Slot'}
                    </h2>
                    <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest mt-1">Timetable Configuration</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Day</label>
                            <select
                                required
                                value={form.day}
                                onChange={e => setForm({ ...form, day: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
                            >
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Time (e.g. 09:00 - 10:30)</label>
                            <input
                                required
                                type="text"
                                placeholder="09:00 - 10:30"
                                value={form.time}
                                onChange={e => setForm({ ...form, time: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Subject</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Advanced Mathematics"
                            value={form.subject}
                            onChange={e => setForm({ ...form, subject: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Section Stream</label>
                            <select
                                required
                                value={form.sectionId}
                                onChange={e => {
                                    const sec = sections.find(s => s.id === e.target.value);
                                    setForm({ ...form, sectionId: e.target.value, section: sec ? sec.name : '' });
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
                            >
                                <option value="" disabled>Select Section</option>
                                {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Instructor</label>
                            <select
                                required
                                value={form.teacherId}
                                onChange={e => {
                                    const t = teachers.find(t => t.id === e.target.value);
                                    setForm({ ...form, teacherId: e.target.value, instructor: t ? t.name : '' });
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
                            >
                                <option value="" disabled>Select Instructor</option>
                                {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Room / Hall</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Hall A1"
                                value={form.room}
                                onChange={e => setForm({ ...form, room: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest pl-1">Type</label>
                            <select
                                value={form.type}
                                onChange={e => setForm({ ...form, type: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none"
                            >
                                <option value="Lecture">Lecture</option>
                                <option value="Laboratory">Laboratory</option>
                                <option value="Seminar">Seminar</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-[var(--text-secondary)] hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[var(--accent-primary)] hover:brightness-110 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-[var(--accent-primary)]/20 disabled:opacity-50">
                            {saving ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Save size={16} />}
                            {slot ? 'Update Configuration' : 'Confirm Deployment'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};


const Timetable = () => {
    const { user } = useAuth();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedDay, setSelectedDay] = useState('Monday');

    // Admin CRUD state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);

    const fetchTimetable = async () => {
        try {
            let res;
            if (user.role === 'ADMIN') {
                res = await timetableService.getAll();
                const secRes = await sectionService.getAll();
                const tRes = await teacherService.getAll();
                setSections(secRes.data || []);
                setTeachers(tRes.data || []);
            } else if (user.role === 'TEACHER') {
                res = await timetableService.getByTeacher(user.id || 'T1');
            } else {
                res = await timetableService.getBySection(user.sectionId || 'S1');
            }
            // Sort by time roughly
            const sorted = (res.data || []).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
            setSchedule(sorted);
        } catch (err) {
            console.error(err);
            toast.error("Failed to sync timetable stream.");
            setSchedule([]); // Remove mock data duplication!
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTimetable();
    }, [user]);

    const handleSave = async (slotData) => {
        try {
            if (slotData.id) {
                await timetableService.updateSlot(slotData.id, slotData);
                toast.success('Timetable configuration updated');
            } else {
                await timetableService.createSlot(slotData);
                toast.success('Live slot deployed to stream');
            }
            setIsModalOpen(false);
            setEditingSlot(null);
            fetchTimetable();
        } catch (error) {
            console.error("Save error: ", error);
            throw error;
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Purge this configuration slot from the timeline?")) return;
        try {
            await timetableService.deleteSlot(id);
            toast.success("Timeline purged.");
            fetchTimetable();
        } catch (error) {
            console.error("Delete error: ", error);
            toast.error("Failed to purge timeslot");
        }
    };

    // Filter by section and day
    const filteredSchedule = schedule.filter(s => {
        const matchSection = (user.role === 'ADMIN' && selectedSection) ? s.section === selectedSection : true;
        const matchDay = s.day === selectedDay;
        // If data lacks day (from old mocks or backend), default to showing everything if Monday
        if (!s.day) return true;
        return matchSection && matchDay;
    });

    if (loading) return <div className="p-6"><TableSkeleton /></div>;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
                        <button
                            onClick={() => { setEditingSlot(null); setIsModalOpen(true); }}
                            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] hover:brightness-110 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-[var(--accent-primary)]/20"
                        >
                            <Plus size={16} />
                            Deploy Slot
                        </button>
                    )}
                </div>
            </div>

            {/* Days Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 px-2">
                {daysOfWeek.map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center justify-center ${selectedDay === day
                                ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/20 shadow-inner'
                                : 'glass-card border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-primary)]/30 text-center'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {filteredSchedule.length === 0 ? (
                <div className="p-16 text-center glass-card border-dashed border-2 border-[var(--border-primary)] rounded-[40px]">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-50">Empty Stream Protocol</p>
                    <p className="text-xl font-bold text-[var(--text-secondary)] mt-2">No active configuration for {selectedDay}{selectedSection ? ` in ${selectedSection}` : ''}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 relative">
                    <div className="absolute left-[-2px] top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-primary)]/20 to-transparent" />

                    <AnimatePresence>
                        {filteredSchedule.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                whileHover={{ x: 10 }}
                                className="glass-card border-[var(--border-primary)] hover:border-[var(--accent-primary)]/30 flex flex-col md:flex-row md:items-center gap-8 relative group py-4 px-6 pr-4"
                            >
                                <div className="w-1.5 h-full absolute left-0 top-0 bg-[var(--accent-primary)] rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex flex-col items-center justify-center p-4 bg-[var(--accent-primary)]/10 rounded-2xl min-w-[160px] border border-[var(--accent-primary)]/10 shrink-0">
                                    <Clock size={20} className="text-[var(--accent-primary)] mb-2" />
                                    <span className="text-xs font-black text-[var(--text-primary)] tracking-wider">{item.time || 'TBA'}</span>
                                    <span className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-tighter mt-1 italic">Protocol Slot</span>
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                    <div className="md:col-span-1">
                                        <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-2 line-clamp-1 italic">{item.subject || 'Unknown'}</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-1 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/10">
                                                <span className="text-[8px] font-bold text-[var(--accent-primary)] uppercase tracking-widest">{item.type || 'Lecture'}</span>
                                            </div>
                                            <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/10">
                                                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">{item.section || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 text-[var(--text-secondary)] mb-2">
                                            <User size={16} className="text-[var(--accent-primary)]/60" />
                                            <span className="text-sm font-black italic uppercase tracking-tighter text-[var(--text-primary)]">{item.instructor || 'TBA'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                            <MapPin size={16} className="text-[var(--accent-primary)]/60" />
                                            <span className="text-xs font-black uppercase tracking-widest opacity-60">{item.room || 'TBA'}</span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-1 group/badge hover:scale-105 transition-transform cursor-pointer">
                                            <ShieldCheck size={18} className="text-emerald-500 opacity-60 group-hover/badge:opacity-100 transition-opacity" />
                                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">Validated Sync</span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex flex-row items-center justify-end gap-3 px-2">
                                        <button className="w-10 h-10 rounded-2xl bg-white/5 border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-emerald-400 hover:border-emerald-400/30 transition-all group/info shadow-inner">
                                            <Info size={18} className="group-hover/info:scale-110 transition-transform" />
                                        </button>

                                        {user.role === 'ADMIN' && (
                                            <>
                                                <button
                                                    onClick={() => { setEditingSlot(item); setIsModalOpen(true); }}
                                                    className="w-10 h-10 rounded-2xl bg-white/5 border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-blue-400 hover:border-blue-400/30 transition-all group/info shadow-inner"
                                                >
                                                    <Edit2 size={16} className="group-hover/info:scale-110 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="w-10 h-10 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all group/info shadow-inner"
                                                >
                                                    <Trash2 size={16} className="group-hover/info:scale-110 transition-transform" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <div className="p-8 glass bg-[var(--accent-primary)]/5 rounded-[40px] border-dashed border-2 border-[var(--border-primary)] text-center relative overflow-hidden group hover:border-[var(--accent-primary)]/30 transition-all">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                <p className="text-[var(--text-secondary)] font-black uppercase tracking-[0.4em] text-[9px] relative z-10 italic">
                    End of Academic Stream Transmission • Protocol Hash: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
                </p>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <TimetableModal
                        slot={editingSlot}
                        sections={sections}
                        teachers={teachers}
                        onClose={() => { setIsModalOpen(false); setEditingSlot(null); }}
                        onSave={handleSave}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Timetable;
