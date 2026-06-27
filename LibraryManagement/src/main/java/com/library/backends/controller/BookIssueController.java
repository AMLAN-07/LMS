package com.library.backends.controller;

import com.library.backends.entity.Book;
import com.library.backends.entity.BookIssue;
import com.library.backends.entity.IssueStatus;
import com.library.backends.entity.Student;
import com.library.backends.repository.BookIssueRepository;
import com.library.backends.repository.BookRepository;
import com.library.backends.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class BookIssueController {

    private final BookIssueRepository bookIssueRepository;
    private final StudentRepository studentRepository;
    private final BookRepository bookRepository;

    @PostMapping("/issue")
    public ResponseEntity<BookIssue> issueBook(
            @RequestParam Long studentId,
            @RequestParam Long bookId,
            @RequestParam(required = false) Integer loanDays) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        BookIssue issue = new BookIssue();
        issue.setStudent(student);
        issue.setBook(book);
        issue.setIssueDate(LocalDate.now());
        issue.setDueDate(LocalDate.now().plusDays(loanDays != null ? loanDays : 14));
        issue.setStatus(IssueStatus.ISSUED);

        return ResponseEntity.ok(bookIssueRepository.save(issue));
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<BookIssue> returnBook(@PathVariable Long id) {
        BookIssue issue = bookIssueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        issue.setReturnDate(LocalDate.now());
        issue.setStatus(IssueStatus.RETURNED);
        return ResponseEntity.ok(bookIssueRepository.save(issue));
    }
}