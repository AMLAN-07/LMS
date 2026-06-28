package com.library.backends.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnedBookDto {
    private Long issueId;
    private String studentName;
    private String bookTitle;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private long daysLate; // 0 if returned on time
    private double fineAmount;
}