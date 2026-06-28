package com.library.backends.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class IssueBookDto {
    private Long issueId;
    private Long bookId;
    private String bookTitle;
    private Long studentId;
    private String studentName;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private String status;
}
