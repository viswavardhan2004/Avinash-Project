import axios from 'axios';

const getBaseUrl = () => {
    const stored = localStorage.getItem('API_URL');
    if (stored && stored.includes('8080')) return stored;
    return 'http://localhost:8080/api';
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to ensure the baseURL is always fresh if needed
api.interceptors.request.use((config) => {
    config.baseURL = getBaseUrl();
    return config;
});

export const submissionService = {
    getAll: () => api.get('/submissions'),
    getByAssignment: (assignmentId) => api.get(`/submissions/assignment/${assignmentId}`),
    submit: (data) => api.post('/submissions', data),
};

export const notificationService = {
    getAll: () => api.get('/notifications'),
    create: (data) => api.post('/notifications', data),
    markRead: (id) => api.put(`/notifications/${id}/read`),
};

export const studentService = {
    getAll: () => api.get('/students'),
    getById: (id) => api.get(`/students/${id}`),
    create: (data) => api.post('/students', data),
    update: (id, data) => api.put(`/students/${id}`, data),
    remove: (id) => api.delete(`/students/${id}`),
    assignToSection: (studentId, sectionId) => api.put(`/students/${studentId}/section/${sectionId}`),
};

export const teacherService = {
    getAll: () => api.get('/teachers'),
    getById: (id) => api.get(`/teachers/${id}`),
    create: (data) => api.post('/teachers', data),
    update: (id, data) => api.put(`/teachers/${id}`, data),
    remove: (id) => api.delete(`/teachers/${id}`),
};

export const sectionService = {
    getAll: () => api.get('/sections'),
    create: (data) => api.post('/sections', data),
    delete: (id) => api.delete(`/sections/${id}`),
    getById: (id) => api.get(`/sections/${id}`),
    mapTeacherSubject: (sectionId, subjectId, teacherId) =>
        api.post(`/sections/${sectionId}/map?subjectId=${subjectId}&teacherId=${teacherId}`),
};

export const subjectService = {
    getAll: () => api.get('/subjects'),
    create: (data) => api.post('/subjects', data),
};

export const noteService = {
    getBySection: (sectionId) => api.get(`/notes/section/${sectionId}`),
    upload: (data) => api.post('/notes/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export const assignmentService = {
    getBySection: (sectionId) => api.get(`/assignments/section/${sectionId}`),
    create: (data) => api.post('/assignments', data),
    submit: (assignmentId, data) => api.post(`/assignments/${assignmentId}/submit`, data),
    grade: (submissionId, data) => api.put(`/assignments/submissions/${submissionId}/grade`, data),
};

export const attendanceService = {
    getAll: () => api.get('/attendance'),
    mark: (rfidUid, subjectId, slotId) =>
        api.post(`/attendance/mark?rfidUid=${rfidUid}&subjectId=${subjectId}&slotId=${slotId}`),
    getPercentage: (rfidUid, subjectId) =>
        api.get(`/attendance/percentage?rfidUid=${rfidUid}&subjectId=${subjectId}`),
};

export const gradeService = {
    getAll: () => api.get('/grades'),
    getByRfid: (rfidUid) => api.get(`/grades/${rfidUid}`),
    add: (rfidUid, data) => api.post(`/grades?rfidUid=${rfidUid}`, data),
    calculateGPA: (rfidUid) => api.get(`/grades/gpa/${rfidUid}`),
};

export const libraryService = {
    getBooks: () => api.get('/library/books'),
    issueBook: (bookId, studentId) => api.get(`/library/issue/${bookId}/${studentId}`),
    returnBook: (issueId) => api.get(`/library/return/${issueId}`),
};

export const timetableService = {
    getAll: () => api.get('/timetable'),
    getBySection: (sectionId) => api.get(`/timetable/section/${sectionId}`),
    getByTeacher: (teacherId) => api.get(`/timetable/teacher/${teacherId}`),
    createSlot: (data) => api.post('/timetable', data),
    updateSlot: (id, data) => api.put(`/timetable/${id}`, data),
    deleteSlot: (id) => api.delete(`/timetable/${id}`),
};

export default api;
