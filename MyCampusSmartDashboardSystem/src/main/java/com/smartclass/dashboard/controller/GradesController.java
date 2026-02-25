package com.smartclass.dashboard.controller;

import com.smartclass.dashboard.entity.Grades;
import com.smartclass.dashboard.entity.Student;
import com.smartclass.dashboard.exception.StudentNotFoundException;
import com.smartclass.dashboard.repository.GradesRepository;
import com.smartclass.dashboard.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
public class GradesController {

    private final GradesRepository gradesRepository;
    private final StudentRepository studentRepository;

    public GradesController(GradesRepository gradesRepository,
                            StudentRepository studentRepository) {
        this.gradesRepository = gradesRepository;
        this.studentRepository = studentRepository;
    }

    // =========================
    // ADD GRADES
    // =========================
    @PostMapping
    public Grades addGrades(
            @RequestParam String rfidUid,
            @RequestBody Grades grades
    ) {
        Student student = studentRepository.findByRfidUid(rfidUid);

        if (student == null) {
            throw new StudentNotFoundException("Invalid RFID. Student not found.");
        }

        grades.setStudent(student);
        return gradesRepository.save(grades);
    }

    // =========================
    // GET GRADES BY RFID
    // =========================
    @GetMapping("/{rfidUid}")
    public List<Grades> getGrades(@PathVariable String rfidUid) {
        Student student = studentRepository.findByRfidUid(rfidUid);

        if (student == null) {
            throw new StudentNotFoundException("Invalid RFID. Student not found.");
        }

        return gradesRepository.findByStudent(student);
    }

    // =========================
    // GET GPA BY RFID
    // =========================
    @GetMapping("/gpa/{rfidUid}")
    public double calculateGPA(@PathVariable String rfidUid) {

        Student student = studentRepository.findByRfidUid(rfidUid);

        if (student == null) {
            throw new StudentNotFoundException("Invalid RFID. Student not found.");
        }

        List<Grades> gradesList = gradesRepository.findByStudent(student);

        if (gradesList.isEmpty()) {
            return 0.0;
        }

        double totalPoints = 0;
        int totalCredits = 0;

        for (Grades g : gradesList) {
            int gradePoint = switch (g.getGrade()) {
                case "A" -> 10;
                case "B" -> 8;
                case "C" -> 6;
                case "D" -> 4;
                default -> 0;
            };

            totalPoints += gradePoint * g.getCredits();
            totalCredits += g.getCredits();
        }

        return totalCredits == 0 ? 0.0 : totalPoints / totalCredits;
    }
}
