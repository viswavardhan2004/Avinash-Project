import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Users,
    Calendar,
    GraduationCap,
    Library,
    LayoutDashboard,
    BookOpen,
    Settings,
    LogOut,
    MessageCircle,
    Fingerprint,
    Grid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../services/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const menuGroups = [
        {
            title: 'Academia',
            items: [
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
                { id: 'timetable', label: 'Schedule', icon: Calendar, path: '/timetable', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
                { id: 'grades', label: 'Metrics', icon: GraduationCap, path: '/grades', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
                { id: 'library', label: 'Knowledge', icon: Library, path: '/library', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
                { id: 'resources', label: 'Vault', icon: BookOpen, path: '/resources', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
            ]
        },
        {
            title: 'Administration',
            items: [
                { id: 'students', label: 'Students', icon: Users, path: '/students', roles: ['ADMIN', 'TEACHER'] },
                { id: 'teachers', label: 'Teachers', icon: Users, path: '/teachers', roles: ['ADMIN'] },
                { id: 'sections', label: 'Manage Sections', icon: Grid, path: '/sections', roles: ['ADMIN'] },
                { id: 'queries', label: 'Queries', icon: MessageCircle, path: '/queries', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
            ]
        }
    ];

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 glass rounded-3xl p-6 flex flex-col gap-8 z-10 border-[var(--border-primary)]"
        >
            <div className="flex flex-col gap-1 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/10 border border-white/10 overflow-hidden transition-all duration-500">
                        <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-[var(--text-primary)] uppercase italic">Avanthi</span>
                </div>
                <div className="pl-1">
                    <p className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] leading-tight">Institute of Engineering & Technology</p>
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
                {menuGroups.map((group) => {
                    const visibleItems = group.items.filter(item => item.roles.includes(user?.role));
                    if (visibleItems.length === 0) return null;

                    return (
                        <div key={group.title} className="flex flex-col gap-2">
                            <h3 className="px-4 text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] opacity-50 mb-1">{group.title}</h3>
                            {visibleItems.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                            ? 'bg-[var(--accent-primary)]/20 text-[var(--text-primary)] shadow-inner border border-[var(--accent-primary)]/30'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon size={18} className={isActive ? 'text-[var(--accent-primary)]' : 'group-hover:text-[var(--accent-primary)]'} />
                                            <span className="text-[11px] font-black uppercase tracking-tight">{item.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    );
                })}
            </nav>

            <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-white/5">
                <h3 className="px-4 text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] opacity-50 mb-1">System</h3>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                            ? 'bg-[var(--accent-primary)]/20 text-[var(--text-primary)] shadow-inner border border-[var(--accent-primary)]/30'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10'
                        }`
                    }
                >
                    <Fingerprint size={18} />
                    <span className="text-[11px] font-black uppercase tracking-tight">Identity Node</span>
                </NavLink>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-all font-black border border-transparent hover:border-red-500/20"
                >
                    <LogOut size={18} />
                    <span className="text-[11px] font-black uppercase tracking-tight">Logout Session</span>
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
