package com.library.backends.controller;

import com.library.backends.dto.FineDto;
import com.library.backends.dto.IssueBookDto;
import com.library.backends.dto.ReturnBookDto;
import com.library.backends.service.LibraryTransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class LibraryTransactionController {

    private LibraryTransactionService libraryTransactionService;

    @PostMapping("/issues")
    public ResponseEntity<IssueBookDto> issueBook(@RequestBody IssueBookDto issueBookDto) {
        return new ResponseEntity<>(libraryTransactionService.issueBook(issueBookDto), HttpStatus.CREATED);
    }

    @GetMapping("/issues")
    public ResponseEntity<List<IssueBookDto>> getIssues() {
        return ResponseEntity.ok(libraryTransactionService.getIssuedBooks());
    }

    @PostMapping("/returns/{issueId}")
    public ResponseEntity<ReturnBookDto> returnBook(@PathVariable Long issueId) {
        return ResponseEntity.ok(libraryTransactionService.returnBook(issueId));
    }

    @GetMapping("/returns")
    public ResponseEntity<List<ReturnBookDto>> getReturns() {
        return ResponseEntity.ok(libraryTransactionService.getReturnedBooks());
    }

    @GetMapping("/fines")
    public ResponseEntity<List<FineDto>> getFines() {
        return ResponseEntity.ok(libraryTransactionService.getFines());
    }

    @PutMapping("/fines/{fineId}/paid")
    public ResponseEntity<FineDto> markFinePaid(@PathVariable Long fineId) {
        return ResponseEntity.ok(libraryTransactionService.markFinePaid(fineId));
    }
}
