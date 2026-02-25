package com.smartclass.dashboard.controller;

import com.smartclass.dashboard.entity.Timetable;
import com.smartclass.dashboard.repository.TimetableRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    private final TimetableRepository timetableRepository;

    public TimetableController(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }
    @GetMapping
    public java.util.List<Timetable> getAllTimetable() {
        return timetableRepository.findAll();
    }

    // ADD TIMETABLE ENTRY
    @PostMapping
    public Timetable addTimetable(@RequestBody Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    // GET TIMETABLE BY DAY
    @GetMapping("/{day}")
    public List<Timetable> getTimetableByDay(@PathVariable String day) {
        return timetableRepository.findByDay(day);
    }
}
