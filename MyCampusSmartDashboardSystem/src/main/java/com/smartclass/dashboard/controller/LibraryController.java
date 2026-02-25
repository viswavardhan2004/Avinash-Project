package com.smartclass.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartclass.dashboard.entity.LibraryBook;
import com.smartclass.dashboard.entity.LibraryIssue;
import com.smartclass.dashboard.service.LibraryService;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    // Add new book
    @PostMapping("/books")
    public LibraryBook addBook(@RequestBody LibraryBook book) {
        return libraryService.addBook(book);
    }

    // Get all books
    @GetMapping("/books")
    public List<LibraryBook> getAllBooks() {
        return libraryService.getAllBooks();
    }

    // Issue book to student
    @PostMapping("/issue")
    public LibraryIssue issueBook(@RequestBody LibraryIssue issue) {
        return libraryService.issueBook(issue);
    }

    // Return book
    @PostMapping("/return/{issueId}")
    public LibraryIssue returnBook(@PathVariable String issueId) {
        return libraryService.returnBook(issueId);
    }
}
