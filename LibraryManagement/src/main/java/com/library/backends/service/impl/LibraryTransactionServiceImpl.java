package com.library.backends.service.impl;

import com.library.backends.dto.FineDto;
import com.library.backends.dto.IssueBookDto;
import com.library.backends.dto.ReturnBookDto;
import com.library.backends.entity.*;
import com.library.backends.exception.ResourcesNotFoundException;
import com.library.backends.repository.*;
import com.library.backends.service.LibraryTransactionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class LibraryTransactionServiceImpl implements LibraryTransactionService {

    private static final double FINE_PER_DAY = 5.0;

    private BookRepository bookRepository;
    private StudentRepository studentRepository;
    private IssuedBookRepository issuedBookRepository;
    private ReturnedBookRepository returnedBookRepository;
    private FineRepository fineRepository;

    @Override
    public IssueBookDto issueBook(IssueBookDto issueBookDto) {
        Book book = bookRepository.findById(issueBookDto.getBookId())
                .orElseThrow(() -> new ResourcesNotFoundException("Book not found with id: " + issueBookDto.getBookId()));
        Student student = studentRepository.findById(issueBookDto.getStudentId())
                .orElseThrow(() -> new ResourcesNotFoundException("Student not found with id: " + issueBookDto.getStudentId()));

        if (book.getBookcopy() <= 0) {
            throw new IllegalArgumentException("Book is not available right now");
        }

        IssuedBook issuedBook = new IssuedBook();
        issuedBook.setBook(book);
        issuedBook.setStudent(student);
        issuedBook.setIssueDate(issueBookDto.getIssueDate() == null ? LocalDate.now() : issueBookDto.getIssueDate());
        issuedBook.setDueDate(issueBookDto.getDueDate() == null ? LocalDate.now().plusDays(14) : issueBookDto.getDueDate());
        issuedBook.setStatus("ISSUED");

        book.setBookcopy(book.getBookcopy() - 1);
        bookRepository.save(book);
        return mapIssue(issuedBookRepository.save(issuedBook));
    }

    @Override
    public ReturnBookDto returnBook(Long issueId) {
        IssuedBook issuedBook = issuedBookRepository.findById(issueId)
                .orElseThrow(() -> new ResourcesNotFoundException("Issue record not found with id: " + issueId));

        if ("RETURNED".equalsIgnoreCase(issuedBook.getStatus())) {
            throw new IllegalArgumentException("This book is already returned");
        }

        LocalDate today = LocalDate.now();
        long lateDays = Math.max(0, ChronoUnit.DAYS.between(issuedBook.getDueDate(), today));
        double fineAmount = lateDays * FINE_PER_DAY;

        issuedBook.setStatus("RETURNED");
        issuedBookRepository.save(issuedBook);

        Book book = issuedBook.getBook();
        book.setBookcopy(book.getBookcopy() + 1);
        bookRepository.save(book);

        ReturnedBook returnedBook = new ReturnedBook();
        returnedBook.setIssuedBook(issuedBook);
        returnedBook.setReturnDate(today);
        returnedBook.setLateDays(lateDays);
        returnedBook.setFineAmount(fineAmount);
        ReturnedBook savedReturn = returnedBookRepository.save(returnedBook);

        if (fineAmount > 0) {
            Fine fine = new Fine();
            fine.setStudent(issuedBook.getStudent());
            fine.setIssuedBook(issuedBook);
            fine.setAmount(fineAmount);
            fineRepository.save(fine);
        }

        return mapReturn(savedReturn);
    }

    @Override
    public List<IssueBookDto> getIssuedBooks() {
        return issuedBookRepository.findAll().stream().map(this::mapIssue).toList();
    }

    @Override
    public List<ReturnBookDto> getReturnedBooks() {
        return returnedBookRepository.findAll().stream().map(this::mapReturn).toList();
    }

    @Override
    public List<FineDto> getFines() {
        return fineRepository.findAll().stream().map(this::mapFine).toList();
    }

    @Override
    public FineDto markFinePaid(Long fineId) {
        Fine fine = fineRepository.findById(fineId)
                .orElseThrow(() -> new ResourcesNotFoundException("Fine not found with id: " + fineId));
        fine.setStatus("PAID");
        return mapFine(fineRepository.save(fine));
    }

    private IssueBookDto mapIssue(IssuedBook issue) {
        IssueBookDto dto = new IssueBookDto();
        dto.setIssueId(issue.getIssueId());
        dto.setBookId(issue.getBook().getBookId());
        dto.setBookTitle(issue.getBook().getTitle());
        dto.setStudentId(issue.getStudent().getId());
        dto.setStudentName(issue.getStudent().getFirstName() + " " + issue.getStudent().getLastName());
        dto.setIssueDate(issue.getIssueDate());
        dto.setDueDate(issue.getDueDate());
        dto.setStatus(issue.getStatus());
        return dto;
    }

    private ReturnBookDto mapReturn(ReturnedBook returnedBook) {
        ReturnBookDto dto = new ReturnBookDto();
        dto.setReturnId(returnedBook.getReturnId());
        dto.setIssueId(returnedBook.getIssuedBook().getIssueId());
        dto.setReturnDate(returnedBook.getReturnDate());
        dto.setLateDays(returnedBook.getLateDays());
        dto.setFineAmount(returnedBook.getFineAmount());
        return dto;
    }

    private FineDto mapFine(Fine fine) {
        FineDto dto = new FineDto();
        dto.setFineId(fine.getFineId());
        dto.setStudentId(fine.getStudent().getId());
        dto.setStudentName(fine.getStudent().getFirstName() + " " + fine.getStudent().getLastName());
        dto.setIssueId(fine.getIssuedBook().getIssueId());
        dto.setAmount(fine.getAmount());
        dto.setStatus(fine.getStatus());
        return dto;
    }
}
