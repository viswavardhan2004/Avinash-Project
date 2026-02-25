package com.smartclass.dashboard.service;

import com.smartclass.dashboard.entity.LibraryBook;
import com.smartclass.dashboard.entity.LibraryIssue;

import java.util.List;

public interface LibraryService {

    LibraryBook addBook(LibraryBook book);

    List<LibraryBook> getAllBooks();

    LibraryIssue issueBook(LibraryIssue issue);

    LibraryIssue returnBook(String issueId);
}
