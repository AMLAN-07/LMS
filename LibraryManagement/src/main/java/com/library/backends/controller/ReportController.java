package com.library.backends.controller;

import com.library.backends.dto.OverdueBookDto;
import com.library.backends.dto.ReturnedBookDto;
import com.library.backends.dto.StudentBookDto;
import com.library.backends.service.BookIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    private final BookIssueService bookIssueService;

    @GetMapping("/overdue-books")
    public ResponseEntity<List<OverdueBookDto>> getOverdueBooks() {
        return ResponseEntity.ok(bookIssueService.getOverdueBooks());
    }

    @GetMapping("/student-books")
    public ResponseEntity<List<StudentBookDto>> getStudentBookReport() {
        return ResponseEntity.ok(bookIssueService.getStudentBookReport());
    }

    @GetMapping("/returned-books")
    public ResponseEntity<List<ReturnedBookDto>> getReturnedBookReport() {
        return ResponseEntity.ok(bookIssueService.getReturnedBookReport());
    }
}