package com.library.backends.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardDto {
    private long totalStudents;
    private long activeStudents;
    private long totalBooks;
    private long availableBooks;
    private long issuedBooks;
    private long returnedBooks;
    private long pendingReturns;
    private double totalFines;
}
