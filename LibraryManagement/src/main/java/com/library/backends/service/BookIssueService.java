package com.library.backends.service;

import com.library.backends.dto.OverdueBookDto;
import com.library.backends.dto.ReturnedBookDto;
import com.library.backends.dto.StudentBookDto;
import com.library.backends.entity.BookIssue;

import java.util.List;

public interface BookIssueService {
    List<OverdueBookDto> getOverdueBooks();
    List<StudentBookDto> getStudentBookReport();
    List<ReturnedBookDto> getReturnedBookReport();
    BookIssue issueBook(Long studentId, Long bookId, Integer loanDays);
    BookIssue returnBook(Long issueId);
}