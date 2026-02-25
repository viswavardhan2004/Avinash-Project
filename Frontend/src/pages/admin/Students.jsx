import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Edit2, Trash2, Shield, MoreVertical } from 'lucide-react';
import { studentService } from '../../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        studentService.getAll().then(res => setStudents(res.data)).catch(console.error);
    }, []);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rfidUid?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Student Registry</h2>
                    <p className="text-[var(--text-secondary)] text-xs font-black uppercase tracking-[0.2em] mt-2">Administrative Node • Sector 07</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-[var(--border-primary)] focus-within:bg-[var(--accent-primary)]/5 focus-within:border-[var(--accent-primary)]/30 transition-all group w-80">
                        <Search size={18} className="text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)]" />
                        <input
                            type="text"
                            placeholder="Identify Student Reference..."
                            className="bg-transparent border-none outline-none text-sm w-full text-[var(--text-primary)] font-bold placeholder:text-[var(--text-secondary)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] hover:brightness-110 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-[var(--accent-primary)]/20 border border-white/10">
                        <UserPlus size={18} />
                        Add Record
                    </button>
                </div>
            </div>

            <div className="glass-card-accent bg-white/[0.01] border-[var(--border-primary)] overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] border-b border-[var(--border-primary)]">
                                <th className="px-8 py-6">Individual Identity</th>
                                <th className="px-6 py-6">RFID Unique ID</th>
                                <th className="px-6 py-6">Academic Stream</th>
                                <th className="px-6 py-6 text-right">Operational Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="border-b border-[var(--border-primary)] hover:bg-[var(--accent-primary)]/5 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] border border-[var(--accent-primary)]/10 font-black text-lg shadow-inner transition-all duration-300">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-[var(--text-primary)] uppercase tracking-tight text-base leading-none mb-1">{student.name}</p>
                                                    <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-wider italic">Verified Profile</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-[var(--border-primary)] w-fit group-hover:border-[var(--accent-primary)]/30 transition-all">
                                                <Shield size={14} className="text-[var(--accent-primary)] opacity-50" />
                                                <span className="font-mono text-[11px] text-[var(--text-primary)] font-black opacity-80">{student.rfidUid || 'UNASSIGNED'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-[var(--text-secondary)] font-bold italic tracking-wide">
                                            {student.studentClass || 'Level 04 - Applied Sciences'}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-3 px-2">
                                                <button className="p-2.5 rounded-xl bg-white/5 border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2.5 rounded-xl bg-white/5 border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2.5 rounded-xl bg-white/5 border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-24 text-[var(--text-secondary)] italic font-black uppercase tracking-[0.4em] opacity-30">Registry Empty / No Matches</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default Students;
