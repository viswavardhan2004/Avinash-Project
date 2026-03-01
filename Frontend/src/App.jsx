import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/admin/Students';
import Attendance from './pages/Attendance';
import Grades from './pages/Grades';
import KnowledgeHub from './pages/Library';
import Timetable from './pages/Timetable';
import Profile from './pages/Profile';
import Queries from './pages/Queries';
import SectionManagement from './pages/admin/SectionManagement';
import AdminDashboard from './pages/admin/Dashboard';
import Teachers from './pages/admin/Teachers';
import ResourceHub from './pages/ResourceHub';
import Assignments from './pages/Assignments';
import Cohorts from './pages/Cohorts';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import StudentDetail from './pages/StudentDetail';
import LibraryAdmin from './pages/admin/LibraryAdmin';
import FeesAdmin from './pages/admin/FeesAdmin';
import { useAuth } from './services/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={
          user?.role === 'ADMIN' ? <AdminDashboard /> : <Dashboard />
        } />
        <Route path="students" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
            <Students />
          </ProtectedRoute>
        } />
        <Route path="sections" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <SectionManagement />
          </ProtectedRoute>
        } />
        <Route path="teachers" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Teachers />
          </ProtectedRoute>
        } />
        <Route path="attendance" element={<Attendance />} />
        <Route path="grades" element={<Grades />} />
        <Route path="library" element={<KnowledgeHub />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="profile" element={<Profile />} />
        <Route path="queries" element={<Queries />} />
        <Route path="resources" element={<ResourceHub />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="cohorts" element={<Cohorts />} />
        <Route path="students/:id" element={<StudentDetail />} />
        <Route path="library-admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <LibraryAdmin />
          </ProtectedRoute>
        } />
        <Route path="fees-admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <FeesAdmin />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
