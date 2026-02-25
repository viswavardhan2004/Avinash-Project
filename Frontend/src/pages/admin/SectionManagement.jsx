import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, UserCheck, BookOpen, Plus, Trash2, MapPin, Users, ArrowRight, Save, Shield } from 'lucide-react';
import { sectionService, studentService, subjectService } from '../../services/api';
import toast from 'react-hot-toast';

const SectionManagement = () => {
    const [activeTab, setActiveTab] = useState('sections');
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newSection, setNewSection] = useState({ name: '', branch: '', year: '', semester: '' });

    useEffect(() => {
        setLoading(true);
        Promise.all([
            sectionService.getAll(),
            studentService.getAll(),
            subjectService.getAll()
        ]).then(([secRes, stdRes, subRes]) => {
            setSections(secRes.data || []);
            setStudents(stdRes.data || []);
            setSubjects(subRes.data || []);
        }).catch(err => {
            console.error(err);
            // Fallback mock data for development if backend isn't ready
            setSections([
                { id: 1, name: 'CSE-A', branch: 'Computer Science', year: '2026', semester: '6' },
                { id: 2, name: 'CSE-B', branch: 'Computer Science', year: '2026', semester: '6' }
            ]);
            setSubjects([
                { id: 1, name: 'Distributed Systems', code: 'CS601' },
                { id: 2, name: 'Machine Learning', code: 'CS602' }
            ]);
        }).finally(() => setLoading(false));
    }, []);

    const handleCreateSection = (e) => {
        e.preventDefault();
        toast.promise(
            sectionService.create(newSection),
            {
                loading: 'Initializing Academic Node...',
                success: 'Section Protocol Active!',
                error: 'Cluster Creation Failed.',
            }
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter italic">Academic Architecture</h2>
                    <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <Shield size={12} className="text-[var(--accent-primary)]" />
                        Infrastructure Level 09 • Sector Mapping
                    </p>
                </div>
                <div className="flex p-1.5 glass rounded-2xl border-[var(--border-primary)] bg-white/5">
                    {[
                        { id: 'sections', label: 'Nodes', icon: Layers },
                        { id: 'students', label: 'Assignments', icon: UserCheck },
                        { id: 'mapping', label: 'Master Map', icon: BookOpen }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/20'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                                }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'sections' && (
                    <motion.div
                        key="sections"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="grid grid-cols-3 gap-8"
                    >
                        <div className="col-span-1 glass-card border-[var(--border-primary)] h-fit space-y-8">
                            <div>
                                <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter">New Node Deployment</h3>
                                <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest mt-1 italic">Define Section Parameters</p>
                            </div>

                            <form onSubmit={handleCreateSection} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-[0.2em] ml-1">Section Identifier</label>
                                    <input
                                        type="text"
                                        placeholder="EX: CSE-A"
                                        className="w-full bg-white/5 border border-[var(--border-primary)] rounded-xl py-3.5 px-5 text-xs font-bold focus:border-[var(--accent-primary)]/30 focus:bg-[var(--accent-primary)]/5 outline-none transition-all placeholder:text-[var(--text-secondary)]/30"
                                        value={newSection.name}
                                        onChange={e => setNewSection({ ...newSection, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-[0.2em] ml-1">Academic Year</label>
                                        <input
                                            type="text"
                                            placeholder="2026"
                                            className="w-full bg-white/5 border border-[var(--border-primary)] rounded-xl py-3.5 px-5 text-xs font-bold focus:border-[var(--accent-primary)]/30 transition-all outline-none"
                                            value={newSection.year}
                                            onChange={e => setNewSection({ ...newSection, year: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-[0.2em] ml-1">Current Sem</label>
                                        <input
                                            type="text"
                                            placeholder="6"
                                            className="w-full bg-white/5 border border-[var(--border-primary)] rounded-xl py-3.5 px-5 text-xs font-bold focus:border-[var(--accent-primary)]/30 transition-all outline-none"
                                            value={newSection.semester}
                                            onChange={e => setNewSection({ ...newSection, semester: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-[0.2em] ml-1">Stream Branch</label>
                                    <select
                                        className="w-full bg-black/40 border border-[var(--border-primary)] rounded-xl py-3.5 px-5 text-xs font-bold focus:border-[var(--accent-primary)]/30 transition-all outline-none appearance-none"
                                        value={newSection.branch}
                                        onChange={e => setNewSection({ ...newSection, branch: e.target.value })}
                                    >
                                        <option value="">Select Protocol Branch...</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Mechanical">Mechanical</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[var(--accent-primary)] hover:brightness-110 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-xl shadow-[var(--accent-primary)]/20 mt-4 flex items-center justify-center gap-2"
                                >
                                    <Plus size={16} />
                                    Initialize Cluster
                                </button>
                            </form>
                        </div>

                        <div className="col-span-2 grid grid-cols-2 gap-6 h-fit">
                            {sections.map(section => (
                                <motion.div
                                    key={section.id}
                                    whileHover={{ y: -5 }}
                                    className="glass-card relative overflow-hidden group border-[var(--border-primary)] px-6 py-8"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-primary)]/10 rounded-bl-[80px] -z-10 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 shadow-xl shadow-[var(--accent-primary)]/10 group-hover:bg-[var(--accent-primary)] transition-all group-hover:text-white">
                                            <Layers size={28} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[8px] font-black text-[var(--accent-primary)] uppercase tracking-[0.3em]">Status: Operational</span>
                                            <div className="h-1.5 w-12 bg-[var(--accent-primary)]/20 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full w-2/3 bg-[var(--accent-primary)]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none uppercase italic">{section.name}</h4>
                                        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest mt-2">{section.branch}</p>
                                    </div>

                                    <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-3">
                                            <Users size={14} className="text-[var(--text-secondary)] opacity-50" />
                                            <div>
                                                <p className="text-[8px] font-black text-[var(--text-secondary)] uppercase">Population</p>
                                                <p className="text-xs font-black text-[var(--text-primary)]">64 Students</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin size={14} className="text-[var(--text-secondary)] opacity-50" />
                                            <div>
                                                <p className="text-[8px] font-black text-[var(--text-secondary)] uppercase">Terminal</p>
                                                <p className="text-xs font-black text-[var(--text-primary)]">Block A-02</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                        <button className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 size={14} />
                                        </button>
                                        <button className="p-2.5 rounded-xl bg-white/5 text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-all">
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'mapping' && (
                    <motion.div
                        key="mapping"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card-accent border-[var(--border-primary)] p-0 overflow-hidden"
                    >
                        <div className="bg-black/40 p-10 border-b border-[var(--border-primary)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full" />
                            <div className="relative z-10 max-w-2xl">
                                <h3 className="text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter italic">Master Academic Matrix</h3>
                                <p className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-[0.3em] mt-3 leading-relaxed">
                                    Establish high-level synchronization between sections, subject payloads, and designated instructional nodes.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] border-b border-[var(--border-primary)]">
                                        <th className="px-10 py-6">Section Node</th>
                                        <th className="px-10 py-6">Subject Payload</th>
                                        <th className="px-10 py-6">Instructional Lead</th>
                                        <th className="px-10 py-6 text-right">Synchronization Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {[1, 2, 3].map(i => (
                                        <tr key={i} className="border-b border-[var(--border-primary)] hover:bg-[var(--accent-primary)]/5 transition-all group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="px-3 py-1.5 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-black uppercase italic">CSE-A</div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-[var(--text-primary)] uppercase tracking-tight text-sm">Advanced Cryptography</span>
                                                    <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase italic mt-1 opacity-50">PRTC-702 • Core Stream</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                                                        <img src={`https://ui-avatars.com/api/?name=Prof+Miller&background=0a1128&color=ffffff`} alt="Teacher" />
                                                    </div>
                                                    <span className="font-bold text-[var(--text-primary)] text-sm">Prof. Adrian Miller</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex justify-end items-center gap-4">
                                                    <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                                                        <UserCheck size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Validated</span>
                                                    </div>
                                                    <button className="p-3 bg-white/5 rounded-xl border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-all">
                                                        <ArrowRight size={16} className="text-[var(--text-secondary)]" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-10 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_var(--accent-glow)]" />
                                <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Real-time Sync Active</span>
                            </div>
                            <button className="flex items-center gap-3 px-10 py-4 bg-[var(--accent-primary)] hover:brightness-110 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white transition-all shadow-2xl shadow-[var(--accent-primary)]/30">
                                <Save size={16} />
                                Push Global Changes
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SectionManagement;
