package com.library.backends.controller;

import com.library.backends.entity.BookIssue;
import com.library.backends.service.BookIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookIssueController {

    private final BookIssueService bookIssueService;

    @PostMapping("/issue")
    public ResponseEntity<BookIssue> issueBook(
            @RequestParam Long studentId,
            @RequestParam Long bookId,
            @RequestParam(required = false) Integer loanDays) {

        BookIssue issue = bookIssueService.issueBook(studentId, bookId, loanDays);
        return ResponseEntity.status(HttpStatus.CREATED).body(issue);
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<BookIssue> returnBook(@PathVariable Long id) {
        BookIssue issue = bookIssueService.returnBook(id);
        return ResponseEntity.ok(issue);
    }
}