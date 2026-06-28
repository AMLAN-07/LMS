package com.library.backends.service.impl;

import com.library.backends.dto.OverdueBookDto;
import com.library.backends.dto.ReturnedBookDto;
import com.library.backends.dto.StudentBookDto;
import com.library.backends.entity.Book;
import com.library.backends.entity.BookIssue;
import com.library.backends.entity.IssueStatus;
import com.library.backends.entity.Student;
import com.library.backends.exception.ResourcesNotFoundException;
import com.library.backends.repository.BookIssueRepository;
import com.library.backends.repository.BookRepository;
import com.library.backends.repository.StudentRepository;
import com.library.backends.service.BookIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookIssueServiceImpl implements BookIssueService {

    private static final double FINE_PER_DAY = 5.0; // ₹5/day overdue

    private final BookIssueRepository bookIssueRepository;
    private final StudentRepository studentRepository;
    private final BookRepository bookRepository;

    @Override
    @Transactional(readOnly = true)
    public List<OverdueBookDto> getOverdueBooks() {
        LocalDate today = LocalDate.now();
        List<BookIssue> overdue = bookIssueRepository.findOverdueIssues(today);

        return overdue.stream()
                .map(bi -> new OverdueBookDto(
                        bi.getId(),
                        bi.getBook().getTitle(),
                        bi.getBook().getAuthor(),
                        bi.getStudent().getFirstName() + " " + bi.getStudent().getLastName(),
                        bi.getStudent().getEmail(),
                        bi.getIssueDate(),
                        bi.getDueDate(),
                        ChronoUnit.DAYS.between(bi.getDueDate(), today)
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentBookDto> getStudentBookReport() {
        List<BookIssue> active = bookIssueRepository.findAllActiveIssues();
        LocalDate today = LocalDate.now();

        return active.stream()
                .map(bi -> new StudentBookDto(
                        bi.getId(),
                        bi.getStudent().getId(),
                        bi.getStudent().getFirstName() + " " + bi.getStudent().getLastName(),
                        bi.getBook().getTitle(),
                        bi.getBook().getAuthor(),
                        bi.getIssueDate(),
                        bi.getDueDate(),
                        bi.getDueDate().isBefore(today) ? "OVERDUE" : "ISSUED"
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReturnedBookDto> getReturnedBookReport() {
        List<BookIssue> returned = bookIssueRepository.findAllReturnedIssues();

        return returned.stream()
                .map(bi -> {
                    long daysLate = Math.max(0, ChronoUnit.DAYS.between(bi.getDueDate(), bi.getReturnDate()));
                    return new ReturnedBookDto(
                            bi.getId(),
                            bi.getStudent().getFirstName() + " " + bi.getStudent().getLastName(),
                            bi.getBook().getTitle(),
                            bi.getIssueDate(),
                            bi.getDueDate(),
                            bi.getReturnDate(),
                            daysLate,
                            bi.getFineAmount() != null ? bi.getFineAmount() : 0.0
                    );
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookIssue issueBook(Long studentId, Long bookId, Integer loanDays) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourcesNotFoundException("Student not found with id: " + studentId));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourcesNotFoundException("Book not found with id: " + bookId));

        if (book.getBookcopy() <= 0) {
            throw new IllegalStateException("No copies of \"" + book.getTitle() + "\" are currently available.");
        }

        book.setBookcopy(book.getBookcopy() - 1);
        bookRepository.save(book);

        BookIssue issue = new BookIssue();
        issue.setStudent(student);
        issue.setBook(book);
        issue.setIssueDate(LocalDate.now());
        issue.setDueDate(LocalDate.now().plusDays(loanDays != null ? loanDays : 14));
        issue.setStatus(IssueStatus.ISSUED);
        issue.setFineAmount(0.0);

        return bookIssueRepository.save(issue);
    }

    @Override
    @Transactional
    public BookIssue returnBook(Long issueId) {
        BookIssue issue = bookIssueRepository.findById(issueId)
                .orElseThrow(() -> new ResourcesNotFoundException("Issue record not found with id: " + issueId));

        if (issue.getReturnDate() != null) {
            throw new IllegalStateException("This book has already been returned.");
        }

        LocalDate today = LocalDate.now();
        issue.setReturnDate(today);

        long daysLate = ChronoUnit.DAYS.between(issue.getDueDate(), today);
        if (daysLate > 0) {
            issue.setFineAmount(daysLate * FINE_PER_DAY);
            issue.setStatus(IssueStatus.RETURNED); // returned, but was late — fine reflects this
        } else {
            issue.setFineAmount(0.0);
            issue.setStatus(IssueStatus.RETURNED);
        }

        // Increment available copies back
        Book book = issue.getBook();
        book.setBookcopy(book.getBookcopy() + 1);
        bookRepository.save(book);

        return bookIssueRepository.save(issue);
    }
}