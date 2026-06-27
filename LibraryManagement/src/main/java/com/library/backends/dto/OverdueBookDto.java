package com.library.backends.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OverdueBookDto {
    private Long issueId;
    private String bookTitle;
    private String author;
    private String studentName;
    private String studentEmail;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private long daysOverdue;
}