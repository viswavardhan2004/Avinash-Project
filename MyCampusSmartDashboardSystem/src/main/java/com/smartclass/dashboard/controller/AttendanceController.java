package com.smartclass.dashboard.controller;

import com.smartclass.dashboard.entity.Attendance;
import com.smartclass.dashboard.entity.Student;
import com.smartclass.dashboard.exception.AttendanceAlreadyMarkedException;
import com.smartclass.dashboard.exception.StudentNotFoundException;
import com.smartclass.dashboard.repository.AttendanceRepository;
import com.smartclass.dashboard.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    public AttendanceController(AttendanceRepository attendanceRepository,
                                StudentRepository studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }
    // =========================
    // GET ALL ATTENDANCE RECORDS
    // =========================
    @GetMapping
    public java.util.List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // =========================
    // MARK ATTENDANCE (RFID)
    // =========================
    @PostMapping
    public Attendance markAttendance(
            @RequestParam String rfidUid,
            @RequestParam String subject,
            @RequestParam char status
    ) {
        Student student = studentRepository.findByRfidUid(rfidUid);

        if (student == null) {
            throw new StudentNotFoundException("Invalid RFID. Student not found.");
        }


        LocalDate today = LocalDate.now();

        boolean alreadyMarked =
                attendanceRepository.existsByStudentAndSubjectAndDate(
                        student, subject, today
                );

        if (alreadyMarked) {
            throw new AttendanceAlreadyMarkedException("Attendance already marked for today.");

        }

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setSubject(subject);
        attendance.setDate(today);
        attendance.setStatus(status);


        return attendanceRepository.save(attendance);
    }

    // =========================
    // ATTENDANCE PERCENTAGE
    // =========================
    @GetMapping("/percentage")
    public Map<String, Object> getAttendancePercentage(
            @RequestParam String rfidUid,
            @RequestParam String subject
    ) {
        Student student = studentRepository.findByRfidUid(rfidUid);

        if (student == null) {
            throw new RuntimeException("Invalid RFID. Student not found.");
        }

        long totalClasses =
                attendanceRepository.countByStudentAndSubject(student, subject);

        if (totalClasses == 0) {
            return Map.of(
                    "studentName", student.getName(),
                    "subjectName", subject,
                    "totalClasses", 0,
                    "presentClasses", 0,
                    "attendancePercentage", 0.0
            );
        }

        long presentClasses =
                attendanceRepository.countByStudentAndSubjectAndStatus(
                        student, subject, 'P'
                );

        double percentage = (presentClasses * 100.0) / totalClasses;

        return Map.of(
                "studentName", student.getName(),
                "subjectName", subject,
                "totalClasses", totalClasses,
                "presentClasses", presentClasses,
                "attendancePercentage", percentage
        );
    }
}
