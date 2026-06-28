package com.library.backends.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReturnBookDto {
    private Long returnId;
    private Long issueId;
    private LocalDate returnDate;
    private long lateDays;
    private double fineAmount;
}
