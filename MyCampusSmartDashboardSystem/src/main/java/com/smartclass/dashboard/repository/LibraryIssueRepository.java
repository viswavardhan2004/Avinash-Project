package com.smartclass.dashboard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.smartclass.dashboard.entity.LibraryIssue;

public interface LibraryIssueRepository extends MongoRepository<LibraryIssue, String> {
}
