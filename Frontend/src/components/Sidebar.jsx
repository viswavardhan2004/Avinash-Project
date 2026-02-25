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

    const allMenuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
        { id: 'students', label: 'Directory', icon: Users, path: '/students', roles: ['ADMIN', 'TEACHER'] },
        { id: 'sections', label: 'Architecture', icon: Grid, path: '/sections', roles: ['ADMIN'] },
        { id: 'timetable', label: 'Schedule', icon: Calendar, path: '/timetable', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
        { id: 'grades', label: 'Metrics', icon: GraduationCap, path: '/grades', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
        { id: 'library', label: 'Knowledge', icon: Library, path: '/library', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
        { id: 'resources', label: 'Vault', icon: BookOpen, path: '/resources', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
        { id: 'queries', label: 'Queries', icon: MessageCircle, path: '/queries', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
    ];

    const filteredMenu = allMenuItems.filter(item => item.roles.includes(user?.role));

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 glass rounded-3xl p-6 flex flex-col gap-8 z-10 border-[var(--border-primary)]"
        >
            <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-[var(--accent-primary)] rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-[var(--accent-primary)]/20 text-white border border-white/10 transition-all duration-500">
                    C
                </div>
                <span className="text-xl font-black tracking-tight text-[var(--text-primary)] uppercase italic">Campus</span>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                {filteredMenu.map((item) => (
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
                                <item.icon size={20} className={isActive ? 'text-[var(--accent-primary)]' : 'group-hover:text-[var(--accent-primary)]'} />
                                <span className="text-[13px] font-black uppercase tracking-tight">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2">
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                            ? 'bg-[var(--accent-primary)]/20 text-[var(--text-primary)] shadow-inner border border-[var(--accent-primary)]/30'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10'
                        }`
                    }
                >
                    <Fingerprint size={20} />
                    <span className="text-[13px] font-black uppercase tracking-tight">Identity Node</span>
                </NavLink>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--accent-primary)]/80 hover:text-white hover:bg-[var(--accent-primary)] transition-all font-black border border-transparent hover:border-[var(--accent-primary)]/30"
                >
                    <LogOut size={20} />
                    <span className="text-[13px] font-black uppercase tracking-tight">Terminate Session</span>
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
