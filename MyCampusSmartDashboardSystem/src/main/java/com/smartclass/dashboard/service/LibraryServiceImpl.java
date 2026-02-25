package com.smartclass.dashboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartclass.dashboard.entity.LibraryBook;
import com.smartclass.dashboard.entity.LibraryIssue;
import com.smartclass.dashboard.repository.LibraryBookRepository;
import com.smartclass.dashboard.repository.LibraryIssueRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class LibraryServiceImpl implements LibraryService {

    @Autowired
    private LibraryBookRepository bookRepository;

    @Autowired
    private LibraryIssueRepository issueRepository;

    @Override
    public LibraryBook addBook(LibraryBook book) {
        return bookRepository.save(book);
    }

    @Override
    public List<LibraryBook> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public LibraryIssue issueBook(LibraryIssue issue) {
        issue.setStatus("ISSUED");
        issue.setIssueDate(LocalDate.now());
        return issueRepository.save(issue);
    }

    @Override
    public LibraryIssue returnBook(String issueId) {
        LibraryIssue issue = issueRepository.findById(issueId).orElseThrow();
        issue.setStatus("RETURNED");
        issue.setReturnDate(LocalDate.now());
        return issueRepository.save(issue);
    }
}
