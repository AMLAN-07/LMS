package com.library.backends.service;

import com.library.backends.dto.FineDto;
import com.library.backends.dto.IssueBookDto;
import com.library.backends.dto.ReturnBookDto;

import java.util.List;

public interface LibraryTransactionService {
    IssueBookDto issueBook(IssueBookDto issueBookDto);
    ReturnBookDto returnBook(Long issueId);
    List<IssueBookDto> getIssuedBooks();
    List<ReturnBookDto> getReturnedBooks();
    List<FineDto> getFines();
    FineDto markFinePaid(Long fineId);
}
